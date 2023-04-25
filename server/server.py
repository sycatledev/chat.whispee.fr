# Importing necessary modules
import asyncio
from datetime import datetime
import logging
import websockets
import os

import json
import uuid
from entities.user import User
from database import Data
from session import Session
# import ssl


# Setting up server ports and variables
SERVER_PORT = 654
WEBSOCKET_PORT = 456
DB_HOST = 'localhost'
DB_PORT = '27017'

online_clients = list()
sessions = dict()
dbclient = None


# Setting up logging to a file
import os

log_folder = "../logs/"
log_file = "server.log"

# Créer le dossier logs s'il n'existe pas déjà
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

# Function to start the server and websocket server
async def start_server() -> None:
    # On production server (Web Secure Socket)
    # ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    # ssl_context.load_cert_chain('chemin/vers/certificat.pem', 'chemin/vers/cle_privee.pem')

    server = await asyncio.start_server((), 'localhost', SERVER_PORT) #, ssl=ssl_context)
    logging.info(f"Server started on port: {SERVER_PORT}")

    websocket_server = await websockets.serve(handle_websocket, 'localhost', WEBSOCKET_PORT) #, ssl=ssl_context)
    logging.info(f"Websocket server started on port: {WEBSOCKET_PORT}")

    await server.start_serving()
    await websocket_server.wait_closed()

# Function to handle incoming websocket connections


async def handle_websocket(websocket, path) -> None:
    client = Client(websocket)
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

async def get_all_sessions():
    sessions = list()

    for client in online_clients:
        if client.session is None:
            continue
        sessions.append(client.session)

    return sessions

class Client:
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

    async def send_socket_message(self, message: str) -> None:
        logging.info(f">> {message}")

        await self.websocket.send(message)

    async def handle_socket_command(self, socket_command: str, socket_request: str) -> None:
        if socket_command == "check_session":
            session_data = json.loads(socket_request)
            session_id = session_data["session_id"]

            if session_id in sessions:
                session = sessions[session_id]

                if session is not None:
                #if session.is_valid():
                    self.session = session

                    await self.send_socket_message("active_session|||" + json.dumps(session.to_object()))
                    return
                # else:
                    # self.session = None

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
            
            user_instance = User(user["_id"], user["username"], user["email"])

            session_id = str(uuid.uuid4())
            self.session = Session(session_id, self.websocket, user_instance)
            sessions[session_id] = self.session

            session_data = {
                "session_id": self.session.session_id
            }
            await self.send_socket_message("login_succeeded|||" + json.dumps(session_data))

        elif socket_command == "register_user":
            credentials = json.loads(socket_request)

            username = credentials["username"]
            if username == "":
                return

            email = credentials["email"]
            if email == "":
                return

            password = credentials["password"]
            if password == "":
                return

            creation = get_database().create_user(username, email, password)

            if (creation is None):
                await self.send_socket_message("register_failed|||")
                return
            
            user_instance = User(creation, username, email)

            session_id = str(uuid.uuid4())
            self.session = Session(session_id, self.websocket, user_instance)
            sessions[session_id] = self.session

            session_data = {
                "session_id": self.session.session_id
            }
            await self.send_socket_message("register_succeeded|||" + json.dumps(session_data))

        elif socket_command == "send_chat_message":
            chat_data = json.loads(socket_request)
            chat_id = int(chat_data["chat_id"])
            content = str(chat_data["content"])

            chat = get_database().get_chat(self.current_chat_id)
            current_time = datetime.now()
            print(self.session)
            print(self.session.user)
            message = chat.add_message(self.session.user.id, content, current_time.timestamp())

            await self.send_message_to_chat(self.current_chat_id, message)

        elif socket_command == "delete_chat_message":
            chat_data = json.loads(socket_request)
            message_id = str(chat_data["message_id"])
            await get_database().delete_message(message_id)
            deleted_message = {"message_id": message_id}

            await self.message_deleted(deleted_message)
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

    async def send_loaded_chat(self, chat_id: int) -> None:
        chat = get_database().get_chat(chat_id)

        if chat is None:
            print("No chat found")
            return

        await self.send_socket_message("chat_loaded|||" + json.dumps(chat.to_object()))
        await self.load_chat_messages(chat.id)

    async def load_chat_messages(self, chat_id: int) -> None:
        messages = get_database().get_messages_to_objects_from_chat_id(chat_id)

        await self.send_socket_message("chat_messages_loaded|||" + json.dumps(messages))

    async def send_message_to_chat(self, chat_id: int, message: str) -> None:
        for client in online_clients:
            if client.current_chat_id == chat_id:
                await client.send_socket_message("chat_message_sended|||" + json.dumps(message.to_object()))

    async def send_chat_message(self, message: str) -> None:
        await self.send_socket_message("chat_message_sended|||" + json.dumps(message.to_object()))

    async def message_deleted(self, message):
        await self.send_socket_message("chat_message_deleted|||" + json.dumps(message))

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
