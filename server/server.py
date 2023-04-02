import asyncio
import logging
import pprint
import websockets
import json
from objects.message import Message
from objects.chat import Chat

SERVER_PORT = 654
WEBSOCKET_PORT = 456

clients = list()
chats = {}

# Temporary
first_chat = Chat(1, "Arthur", 0)
chats[first_chat.id] = first_chat
second_chat = Chat(2, "Vincent", 4)
chats[second_chat.id] = second_chat

logging.basicConfig(
    filename="../logs/server.log", 
    level=logging.INFO, 
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# ------------------------------------------
#       Socket and network methods
# ------------------------------------------
async def handle_client(reader, writer):
    logging.info("New client connected")

async def handle_websocket(websocket, path):
    logging.info(f"New websocket client connected from {path}")

    try:
        clients.append(websocket)

        async for message in websocket:
            await handle_socket_message(websocket, message)
    except websockets.exceptions.ConnectionClosed:
        logging.info("Websocket connection closed")

    logging.info("Websocket client disconnected")
    clients.remove(websocket)

async def start_server():
    server = await asyncio.start_server(handle_client, 'localhost', SERVER_PORT)
    logging.info(f"Server started on port: {SERVER_PORT}")

    websocket_server = await websockets.serve(handle_websocket, 'localhost', WEBSOCKET_PORT)
    logging.info(f"Websocket server started on port: {WEBSOCKET_PORT}")

    await server.start_serving()
    await websocket_server.wait_closed()

async def shutdown(loop):
    logging.info("Closing connections...")
    tasks = [t for t in asyncio.all_tasks() if t is not asyncio.current_task()]
    [task.cancel() for task in tasks]
    await asyncio.gather(*tasks, return_exceptions=True)
    loop.stop()

async def handle_socket_message(websocket, socket_message):
    socket_data = socket_message.split("|||")
    socket_command = socket_data[0]
    socket_request = socket_data[1]
    
    logging.info(f"<< {socket_message}")
    if socket_command == "ping":
        await send_socket_message(websocket, "pong|||")
    elif socket_command == "load_chat":
        chat_data = json.loads(socket_request)
        chat_id = int(chat_data["chat_id"])

        await send_loaded_chat(websocket, chat_id)   
    elif socket_command == "send_chat_message":
        chat_data = json.loads(socket_request)
        chat_id = int(chat_data["chat_id"])

        chat = chats[chat_id]
        message = Message(chat_data["message_uuid"])
        message.chat_id = chat.id
        message.content = chat_data["message_content"]

        chat.add_message(message)

        await send_chat_message_to_everyone(message)
    elif socket_command == "load_chats":
        await send_loaded_chats(websocket)

async def send_socket_message(websocket, message):
    logging.info(f">> {message}")
    await websocket.send(message)

# ------------------------------------------
#       Chat app and messages methods
# ------------------------------------------

async def send_loaded_chats(websocket):
    chat_list = []

    for chat_id in chats.keys():
        chat = chats[chat_id]
        chat_list.append(chat.to_json())

    await send_socket_message(websocket, "loaded_chats|||" + json.dumps(chat_list))

async def send_loaded_chat(websocket, chat_id):
    chat = chats[chat_id]

    if chat is None:
        print("No chat found")
        return

    await send_socket_message(websocket, "chat_loaded|||" + json.dumps(chat.to_json()))   

async def send_chat_message(websocket, message):
    await send_socket_message(websocket, "chat_message_sended|||" + json.dumps(message.to_json()))

async def send_chat_message_to_everyone(message):
    for client in clients:
        await send_chat_message(client, message)


# ------------------------------------------
#       To run after everthing is loaded
# ------------------------------------------
loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(start_server())
    loop.run_forever()
except KeyboardInterrupt:
    loop.run_until_complete(shutdown(loop))
finally:
    loop.close()
    logging.info("Server closed")