# Importing necessary modules
import asyncio
import logging
import pprint
import websockets
import json
from objects.message import Message
from objects.chat import Chat

# Setting up server ports and variables
SERVER_PORT = 654
WEBSOCKET_PORT = 456

online_clients = list()
chats = {}

# Creating a couple of chats to test with (temporary code)
first_chat = Chat(1, "Arthur")
chats[first_chat.id] = first_chat
second_chat = Chat(2, "Vincent")
chats[second_chat.id] = second_chat

# Setting up logging to a file
logging.basicConfig(
    filename="../logs/server.log", 
    level=logging.INFO, 
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# ------------------------------------------
#       Socket and network methods
# ------------------------------------------

class ClientConnection:
    def __init__(self, websocket, ip_adress):
        self.websocket = websocket
        self.ip_adress = ip_adress
        self.user = None
        self.current_chat_id = None

    async def send_socket_message(self, message):
        logging.info(f">> {message}")
        await self.websocket.send(message)

    async def handle_socket_command(self, socket_command, socket_request):
        if socket_command == "send_chat_message":
            chat_data = json.loads(socket_request)
            chat_id = int(chat_data["chat_id"])
            message_content = str(chat_data["message_content"])

            chat = chats[chat_id]
            message = Message(chat_data["message_uuid"], chat.id, message_content)

            chat.add_message(message)

            await self.send_message_to_chat(chat.id, message)
        elif socket_command == "load_chat":
            chat_data = json.loads(socket_request)
            chat_id = int(chat_data["chat_id"])

            self.current_chat_id = chat_id

            await self.send_loaded_chat(chat_id)
        elif socket_command == "load_chats":
            await self.send_loaded_chats()
        else:
            print("Unknown socket command: %s" % socket_command)
            pass

    async def start(self):
        async for message in self.websocket:
            socket_command, socket_request = message.split("|||", 1)
            await self.handle_socket_command(socket_command, socket_request)

        await self.websocket.close()
        online_clients.remove(self)
        logging.info(f"Client {self.ip_address} disconnected")


    # ------------------------------------------
    #       Chat app and messages methods
    # ------------------------------------------

    async def send_loaded_chats(self):
        chat_list = []

        for chat_id in chats.keys():
            chat = chats[chat_id]
            chat_list.append(chat.to_json())

        await self.send_socket_message("loaded_chats|||" + json.dumps(chat_list))

    async def send_loaded_chat(self, chat_id):
        chat = chats[chat_id]

        if chat is None:
            print("No chat found")
            return
        
        await self.send_socket_message("chat_loaded|||" + json.dumps(chat.to_json()))

    async def send_message_to_chat(self, chat_id, message):
        for client in online_clients:
            if client.current_chat_id == chat_id:
                await client.send_socket_message("chat_message_sended|||" + json.dumps(message.to_json()))

    async def send_chat_message(self, message):
        await self.send_socket_message("chat_message_sended|||" + json.dumps(message.to_json()))

    async def send_chat_message_to_everyone(self, message):
        for client in online_clients:
            await client.websocket.send_chat_message(message)

    async def send_loaded_chats(self):
        chat_list = []

        for chat_id in chats.keys():
            chat = chats[chat_id]
            chat_list.append(chat.to_json())

        await self.send_socket_message("loaded_chats|||" + json.dumps(chat_list))

    async def send_loaded_chat(self, chat_id):
        chat = chats[chat_id]

        if chat is None:
            print("No chat found")
            return

        await self.send_socket_message("chat_loaded|||" + json.dumps(chat.to_json()))

    async def send_chat_message(self, message):
        await self.send_socket_message("chat_message_sended|||" + json.dumps(message.to_json()))

    async def send_chat_message_to_everyone(self, message):
        for client in online_clients:
            if client is not self:
                await client.send_chat_message(message)

class User:

    def __init__(self, id):
        self.id = id
        self.display_name = "Default display name"
        self.username = "Default username"


# Function to start the server and websocket server
async def start_server():
    server = await asyncio.start_server((), 'localhost', SERVER_PORT)
    logging.info(f"Server started on port: {SERVER_PORT}")

    websocket_server = await websockets.serve(handle_websocket, 'localhost', WEBSOCKET_PORT)
    logging.info(f"Websocket server started on port: {WEBSOCKET_PORT}")

    await server.start_serving()
    await websocket_server.wait_closed()

# Function to handle incoming websocket connections
async def handle_websocket(websocket, path):
    ip_address = websocket.remote_address[0]
    client = ClientConnection(websocket, ip_address)
    online_clients.append(client)
    logging.info(f"Client {ip_address} connected from {path}")

    await client.start()

# Function to shut down the server
async def shutdown(loop):
    logging.info("Closing connections...")

    # Cancelling all tasks except the current task
    tasks = [t for t in asyncio.all_tasks() if t is not asyncio.current_task()]
    [task.cancel() for task in tasks]

    # Waiting for all tasks to complete
    await asyncio.gather(*tasks, return_exceptions=True)
    loop.stop()


# ------------------------------------------
#       To run after everything is loaded
# ------------------------------------------
loop = asyncio.get_event_loop()
try:
    # Starting the server and running it forever
    loop.run_until_complete(start_server())
    loop.run_forever()
except KeyboardInterrupt:
    # Handling a keyboard interrupt to shutdown the server
    loop.run_until_complete(shutdown(loop))
finally:
    # Closing the server and logging the message
    loop.close()
    logging.info("Server closed")