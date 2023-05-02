import pymongo
from entities.message import Message
from entities.chat import Chat
from entities.user import User
import bcrypt
from bson import json_util
from bson.objectid import ObjectId
DB_HOST = 'localhost'
DB_PORT = '27017'


class Data:
    def __init__(self, dbhost, dbport):
        self.dbhost = dbhost
        self.dbport = dbport
        self.database = self.get_database("privatemessage")

    # private method
    def get_client(self):
        dbclient = pymongo.MongoClient(
            f"mongodb://{self.dbhost}:{self.dbport}/")
        return dbclient

    # private method
    def get_database(self, database_name):
        print("Connecting to database..")
        client = self.get_client()
        try:
            database = client[database_name]
            print(f"Successfully connected to database '{database_name}'.")
        except pymongo.errors.ConnectionError as e:
            print("Failed to connect to database")
            raise e

        return database

    # public method
    def get_messages_from_chat_id(self, chat_id):
        messages_collection = self.database.messages
        messages_cursor = messages_collection.find({"chat_id": chat_id})
        messages = []
        for message_json in messages_cursor:
            message = Message(
                uuid=message_json["id"],
                chat_id=message_json["chat_id"],
                content=message_json["content"],
                date=message_json["date"],
                sender_id=message_json["sender_id"]
            )
            messages.append(message)
        return messages

    # public method
    def get_messages_to_objects_from_chat_id(self, chat_id):
        messages_collection = self.database.messages
        messages = []

        messages_cursor = messages_collection.find({"chat_id": chat_id})

        for message_json in messages_cursor:
            message_json['_id'] = json_util.dumps(message_json['_id'])
            messages.append(message_json)

        return messages

    def save_message(self, chat_id, sender_id, message_text, message_date) -> str:
        messages_collection = self.database.messages

        message = {"chat_id": chat_id, "sender_id": sender_id,
                   "content": message_text, "date": message_date}
        result = messages_collection.insert_one(message)

        return json_util.dumps(result.inserted_id)

    async def delete_message(self, message_id):
        messages_colletion = self.database.messages
        messages_colletion.delete_one({"_id": ObjectId(message_id)})

    def get_chat(self, chat_id: int) -> Chat:
        chats_collection = self.database.chats
        chat_cursor = chats_collection.find_one({"chat_id": chat_id})

        if (chat_cursor is None):
            return None

        return Chat(chat_cursor["chat_id"], chat_cursor["chat_name"])

    # public method
    def get_all_chats_to_objects(self):
        chats = []

        chats_collection = self.database.chats

        chats_cursor = chats_collection.find({})

        for chat_json in chats_cursor:
            chat_json['_id'] = json_util.dumps(chat_json['_id'])
            chats.append(chat_json)

        return chats

    # public method
    def get_user_by_email(self, email) -> dict:
        user = self.database.users.find_one({"email": email})

        if user is not None:
            user['_id'] = json_util.dumps(user['_id'])

        return user

    def get_user_by_username(self, username) -> dict:
        user = self.database.users.find_one({"username": username})

        if user is not None:
            user['_id'] = json_util.dumps(user['_id'])

        return user

    def create_user(self, username, email, password) -> dict:
        hashed_password = bcrypt.hashpw(
            password.encode('utf-8'), bcrypt.gensalt())

        user = {
            "username": username,
            "email": email,
            "password": hashed_password.decode('utf-8')
        }

        result = self.database.users.insert_one(user)

        if result.inserted_id is not None:
            user_id = json_util.dumps(result.inserted_id)

        return user_id

    def authenticate_user(self, identifier, password) -> str:
        user = None
        # Check if identifier is email or username
        if '@' in identifier:
            user = self.get_user_by_email(identifier)
        else:
            user = self.get_user_by_username(identifier)

        # Check if user exists and password is correct
        if user is not None and bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
            return user
        else:
            return None
