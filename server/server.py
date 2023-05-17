import asyncio
import logging
import os
import json
import uuid
import websockets
from datetime import datetime
from database import MongoDatabase
from entities.user import User
from session import Session

SERVER_PORT = 654
WEBSOCKET_PORT = 456

DB_NAME = "privatemessage"
DB_HOST = 'localhost'
DB_PORT = '27017'

log_folder = "../logs/"
log_file = "server.log"

online_clients = []
sessions = {}
db_client = None


if not os.path.exists(log_folder):
    os.makedirs(log_folder)

log_file_path = os.path.join(log_folder, log_file)
if not os.path.exists(log_file_path):
    with open(log_file_path, 'w') as f:
        print("The file ./logs/server.log has been created.")

logging.basicConfig(
    filename=log_folder + log_file,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)


def log_message(message):
    logging.info(f"{message}")
    print(message)


async def start_server() -> None:
    server = await asyncio.start_server((), 'localhost', SERVER_PORT)
    logging.info(f"Server started on port: {SERVER_PORT}")

    websocket_server = await websockets.serve(handle_websocket, 'localhost', WEBSOCKET_PORT)
    logging.info(f"Websocket server started on port: {WEBSOCKET_PORT}")

    await server.start_serving()
    await websocket_server.wait_closed()


async def handle_websocket(websocket, path) -> None:
    client = Client(websocket)
    online_clients.append(client)

    await client.start()


async def shutdown(loop) -> None:
    logging.info("Closing connections...")

    tasks = [t for t in asyncio.all_tasks() if t is not asyncio.current_task()]
    [task.cancel() for task in tasks]

    await asyncio.gather(*tasks, return_exceptions=True)
    loop.stop()


def get_database() -> MongoDatabase:
    global db_client

    if db_client is None:
        db_client = MongoDatabase(DB_HOST, DB_PORT, DB_NAME)

    return db_client


async def get_all_sessions():
    return [c.session for c in online_clients if c.session]


class Client:
    def __init__(self, websocket):
        self.websocket = websocket
        self.session = None

    async def start(self) -> None:
        async for message in self.websocket:
            request = json.loads(message)
            await self.handle_socket_command(request["command"], request["data"])

        await self.websocket.close()
        online_clients.remove(self)

    async def send_socket_message(self, message: str) -> None:
        logging.info(f">> {message}")

        await self.websocket.send(message)

    async def handle_socket_command(self, socket_command: str, socket_request: dict) -> None:
        if socket_command == "check_session":
            session_id = socket_request["session_id"]
            if session_id in sessions:
                session = sessions[session_id]

                if session is not None:
                    self.session = session

                    await self.send_socket_message(json.dumps({
                        "command": "active_session",
                        "data": session.to_object()
                    }))
                    return

            await self.send_socket_message(json.dumps({
                "command": "session_inactive",
                "data": {}
            }))

        elif socket_command == "check_identifier":
            identifier = socket_request["identifier"]

            # Check if identifier is email or username
            if '@' in identifier:
                user = get_database().get_user_by_email(identifier)
            else:
                user = get_database().get_user_by_username(identifier)

            if user is None:
                await self.send_socket_message(json.dumps({
                    "command": "no_identifier_found",
                    "data": {}
                }))
            else:
                await self.send_socket_message(json.dumps({
                    "command": "identifier_found",
                    "data": user
                }))

        elif socket_command == "login_user":
            user_identifier = socket_request["identifier"]
            if user_identifier == "":
                return

            user_password = socket_request["password"]
            if user_password == "":
                return

            user = get_database().authenticate_user(user_identifier, user_password)

            # If connection has not been established
            if user is None:
                await self.send_socket_message(json.dumps({
                    "command": "login_failed",
                    "data": {}
                }))
                return

            user_instance = User(user["_id"], user["username"], user["email"])

            session_id = str(uuid.uuid4())
            self.session = Session(session_id, self.websocket, user_instance)
            sessions[session_id] = self.session

            session_data = {
                "session_id": self.session.session_id
            }
            await self.send_socket_message(json.dumps({
                "command": "login_succeeded",
                "data": session_data
            }))

        elif socket_command == "register_user":
            username = socket_request["username"]
            if username == "":
                return

            email = socket_request["email"]
            if email == "":
                return

            password = socket_request["password"]
            if password == "":
                return

            creation = get_database().create_user(username, email, password)

            if (creation is None):
                await self.send_socket_message(json.dumps({
                    "command": "register_failed",
                    "data": {}
                }))
                return

            user_instance = User(creation, username, email)

            session_id = str(uuid.uuid4())
            self.session = Session(session_id, self.websocket, user_instance)
            sessions[session_id] = self.session

            session_data = {
                "session_id": self.session.session_id
            }
            await self.send_socket_message(json.dumps({
                "command": "register_succeeded",
                "data": session_data
            }))

        elif socket_command == "disconnect":
            if self.session is not None:
                sessions[self.session.session_id] = None

            await self.send_socket_message(json.dumps({
                "command": "user_disconnected",
                "data": {}
            }))

        elif socket_command == "send_chat_message":
            chat_id = int(socket_request["chat_id"])
            content = str(socket_request["content"])

            chat = get_database().get_chat(chat_id)
            current_time = datetime.now()
            message = chat.add_message(
                self.session.user.id, content, current_time.timestamp())

            await self.send_message_to_chat(self.session.user.opened_chat_id, message)

        elif socket_command == "delete_chat_message":
            message_id = str(socket_request["message_id"])
            await get_database().delete_message(message_id)
            deleted_message = {"message_id": message_id}

            await self.message_deleted(deleted_message)

        elif socket_command == "load_chat":
            chat_id = int(socket_request["chat_id"])

            self.session.user.opened_chat_id = chat_id

            await self.send_loaded_chat(chat_id)

        elif socket_command == "load_chats":
            await self.send_loaded_chats()
        elif socket_command == "load_friends":
            await self.send_loaded_friends()
        else:
            print("Unknown socket command: %s" % socket_command)

    # ------------------------------------------
    #       Chat app and messages methods
    # ------------------------------------------

    async def send_loaded_chats(self) -> None:
        await self.send_socket_message(json.dumps({
            "command": "chats_loaded",
            "data": get_database().get_all_chats_to_objects()
        }))

    async def send_loaded_friends(self) -> None:
        await self.send_socket_message(json.dumps({
            "command": "friends_loaded",
            "data": get_database().get_all_friends_to_objects()
        }))

    async def send_loaded_chat(self, chat_id: int) -> None:
        chat = get_database().get_chat(chat_id)

        if chat is None:
            print("No chat found")
            return

        await self.send_socket_message(json.dumps({
            "command": "chat_loaded",
            "data": chat.to_object()
        }))
        await self.load_chat_messages(chat.id)

    async def load_chat_messages(self, chat_id: int) -> None:
        messages = get_database().get_messages_to_objects_from_chat_id(chat_id)
        await self.send_socket_message(json.dumps({
            "command": "chat_messages_loaded",
            "data": messages
        }))

    async def send_message_to_chat(self, chat_id: int, message: str) -> None:
        for client in online_clients:
            if client.session is None:
                continue

            if client.session.user.opened_chat_id == chat_id:
                await client.send_socket_message(json.dumps({
                    "command": "chat_message_sended",
                    "data": message.to_object()
                }))

    async def send_chat_message(self, message: str) -> None:
        await self.send_socket_message(json.dumps({
            "command": "chat_message_sended",
            "data": message.to_object()
        }))

    async def message_deleted(self, message):
        for client in online_clients:
            if client.session is None:
                continue

        await self.send_socket_message(json.dumps({
            "command": "chat_message_deleted",
            "data": message
        }))

    async def send_chat_message_to_everyone(self, message: str) -> None:
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
