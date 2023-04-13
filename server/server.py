# Importing necessary modules
import asyncio
from datetime import datetime
import logging
import websockets
import json
import uuid
from entities.chat import Chat
from entities.message import Message
from entities.user import User
from database import Data
from session import Session

# Setting up server ports and variables
SERVER_PORT = 654
WEBSOCKET_PORT = 456
DB_HOST = 'localhost'
DB_PORT = '27017'

online_clients = list()
dbclient = None

# Setting up logging to a file
logging.basicConfig(
    filename="../logs/server.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Function to start the server and websocket server
async def start_server() -> None:
    server = await asyncio.start_server((), 'localhost', SERVER_PORT)
    logging.info(f"Server started on port: {SERVER_PORT}")

    websocket_server = await websockets.serve(handle_websocket, 'localhost', WEBSOCKET_PORT)
    logging.info(f"Websocket server started on port: {WEBSOCKET_PORT}")

    await server.start_serving()
    await websocket_server.wait_closed()

# Function to handle incoming websocket connections
async def handle_websocket(websocket, path) -> None:
    client = SocketHandler(websocket)
    online_clients.append(client)

    await client.start()

# Function to shut down the server
async def shutdown(loop) -> None:
    logging.info("Closing connections...")

    # Cancelling all tasks except the current task
    tasks = [t for t in asyncio.all_tasks() if t is not asyncio.current_task()]
    [task.cancel() for task in tasks]

    # Waiting for all tasks to complete
    await asyncio.gather(*tasks, return_exceptions=True)
    loop.stop()

# Function to connect to database
def get_database() -> Data:
    global dbclient
    
    if (dbclient == None):
        dbclient = Data(DB_HOST, DB_PORT)

    return dbclient

class SocketHandler:
    def __init__(self, websocket):
        self.websocket = websocket
        self.current_chat_id = None
        self.session = None

    async def start(self) -> None:
        async for message in self.websocket:
            socket_command, socket_request = message.split("|||", 1)
            await self.handle_socket_command(socket_command, socket_request)

        await self.websocket.close()
        online_clients.remove(self)

    async def send_socket_message(self, message:str) -> None:
        logging.info(f">> {message}")

        await self.websocket.send(message)

    async def handle_socket_command(self, socket_command:str, socket_request:str) -> None:
        if socket_command == "check_session":

            if self.session is not None:
                if self.session.is_valid():
                    await self.send_socket_message("active_session|||" + json.dumps(self.session.to_json()))
                    return

                else:
                    self.session = None

            await self.send_socket_message("session_inactive|||")
        
        elif socket_command == "check_identifier":
            credential = json.loads(socket_request)
            identifier = credential["identifier"]

            # Check if identifier is email or username
            if '@' in identifier:
                user = get_database().get_user_by_email(identifier)
            else:
                user = get_database().get_user_by_username(identifier)

            if user is None:
                await self.send_socket_message("no_identifier_found|||")
            else:
                await self.send_socket_message("identifier_found|||" + json.dumps(user))

        elif socket_command == "login_user":
            credentials = json.loads(socket_request)

            user_identifier = credentials["identifier"]
            if user_identifier == "":
                return

            user_password = credentials["password"]
            if user_password == "":
                return

            user = get_database().authenticate_user(user_identifier, user_password)

            # If connection has not been established
            if user is None:
                await self.send_socket_message("login_failed|||")
                return

            session_id = str(uuid.uuid4())
            self.session = Session(session_id, self.websocket, user)

            session_data = {
                "session_id": self.session.id
            }
            await self.send_socket_message("login_succeeded|||" + json.dumps(session_data))

            return

        elif socket_command == "send_chat_message":
            chat_data = json.loads(socket_request)
            chat_id = int(chat_data["chat_id"])
            message_content = str(chat_data["message_content"])

            chat = get_database().get_chat(self.current_chat_id)
            current_time = datetime.now()

            message = Message(chat_data["message_uuid"], chat.id, message_content, current_time.timestamp())
            
            chat.add_message(message)

            await self.send_message_to_chat(self.current_chat_id, message)

        elif socket_command == "load_chat":
            chat_data = json.loads(socket_request)
            chat_id = int(chat_data["chat_id"])

            self.current_chat_id = chat_id

            await self.send_loaded_chat(chat_id)

        elif socket_command == "load_chats":
            await self.send_loaded_chats()

        else:
            print("Unknown socket command: %s" % socket_command)

    # ------------------------------------------
    #       Chat app and messages methods
    # ------------------------------------------

    async def send_loaded_chats(self) -> None:
        await self.send_socket_message("chats_loaded|||" + json.dumps(get_database().get_all_chats_to_objects()))

    async def send_loaded_chat(self, chat_id : int) -> None:
        chat = get_database().get_chat(chat_id)

        if chat is None:
            print("No chat found")
            return

        await self.send_socket_message("chat_loaded|||" + json.dumps(chat.to_json()))
        await self.load_chat_messages(chat.id)

    async def load_chat_messages(self, chat_id:int) -> None:
        messages = get_database().get_messages_to_objects_from_chat_id(chat_id)

        await self.send_socket_message("chat_messages_loaded|||" + json.dumps(messages))

    async def send_message_to_chat(self, chat_id:int, message:str) -> None:
        for client in online_clients:
            if client.current_chat_id == chat_id:
                await client.send_socket_message("chat_message_sended|||" + json.dumps(message.to_json()))

    async def send_chat_message(self, message:str) -> None:
        await self.send_socket_message("chat_message_sended|||" + json.dumps(message.to_json()))

    async def send_chat_message_to_everyone(self, message:str) -> None:
        for client in online_clients:
            await client.websocket.send_chat_message(message)

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
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