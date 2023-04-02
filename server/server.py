import asyncio
import logging
import websockets
import json
from objects.message import Message
from objects.chat import Chat
import var_dump

SERVER_PORT = 654
WEBSOCKET_PORT = 456

clients = list()
chats = dict()

logging.basicConfig(
    filename="../logs/server.log", 
    level=logging.INFO, 
    format="%(asctime)s - %(levelname)s - %(message)s"
)

async def handle_client(reader, writer):
    logging.info("New client connected")

async def handle_websocket(websocket, path):
    logging.info(f"New websocket client connected from {path}")

    try:
        clients.append(websocket)

        async for message in websocket:
            await handle_message(websocket, message)
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

async def handle_message(websocket, socket_message):
    socket_data = socket_message.split("|||")
    socket_command = socket_data[0]
    socket_request = socket_data[1]
    
    logging.info(f"<< {socket_message}")
    if socket_command == "ping":
        await add_message(websocket, "pong|||")
    elif socket_command == "load_chat":
        chat_data = json.loads(socket_request)

        chat = Chat(chat_data["chat_id"])

        await send_loaded_chat(websocket, chat)   
    elif socket_command == "send_chat_message":
        chat_data = json.loads(socket_request)

        chat = Chat(chat_data["chat_id"])
        message = Message(chat_data["message_uuid"])
        message.chat_id = chat.id
        message.content = chat_data["message_content"]

        chat.add_message(message)

        await send_chat_message_to_everyone(message)
    elif socket_command == "load_chats":
        await send_loaded_chats(websocket)

async def add_message(websocket, message):
    logging.info(f">> {message}")
    await websocket.send(message)

async def send_loaded_chats(websocket):
    chat_list = list()

    first_chat = Chat(1)
    first_chat.name = "Arthur"
    first_chat.pending_message = 0
    chat_list.append(first_chat.to_json())

    second_chat = Chat(2)
    second_chat.name = "Vincent"
    second_chat.pending_message = 2
    chat_list.append(second_chat.to_json())

    await add_message(websocket, "loaded_chats|||" + json.dumps(chat_list))   

async def send_loaded_chat(websocket, chat):
    messages_list = list()

    for message in chat.messages:
        messages_list.append(message.to_json())

    await add_message(websocket, "chat_loaded|||" + json.dumps(messages_list))   

async def send_chat_message(websocket, message):
    await add_message(websocket, "chat_message_sended|||" + json.dumps(message.to_json()))

async def send_chat_message_to_everyone(message):
    for client in clients:
        await send_chat_message(client, message)

loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(start_server())
    loop.run_forever()
except KeyboardInterrupt:
    loop.run_until_complete(shutdown(loop))
finally:
    loop.close()
    logging.info("Server closed")