import pymongo
from entities.message import Message
from entities.chat import Chat

DB_HOST = 'localhost'
DB_PORT = '27017'

class Data:
    def __init__(self, dbhost, dbport):
        self.dbhost = dbhost
        self.dbport = dbport
        self.database = self.get_database("privatemessage")

    # private method
    def get_client(self):
        dbclient = pymongo.MongoClient(f"mongodb://{self.dbhost}:{self.dbport}/")
        return dbclient

    # private method
    def get_database(self, database_name):
        print("Connecting to database..")
        client = self.get_client()
        database = client[database_name]
        print(f"Successfuly connected to database '{database_name}'.")

        return database

    # public method
    def get_messages_from_chat_id(self, chat_id):
        messages_collection = self.database.messages
        messages_cursor = messages_collection.find({"chat_id": chat_id})
        messages = []
        for message_json in messages_cursor:
            message = Message(
                uuid=message_json["message_uuid"],
                chat_id=message_json["chat_id"],
                content=message_json["message_content"],
                author=message_json["message_author"]
            )
            messages.append(message)
        return messages

    # public method
    def get_messages_to_objects_from_chat_id(self, chat_id):
        messages_collection = self.database.messages
        messages = []

        messages_cursor = messages_collection.find({"chat_id": chat_id}, {'_id': 0})

        for message_json in messages_cursor:
            messages.append(message_json)

        return messages
    
    def save_message(self, chat_id, message_text):
        messages_collection = self.database.messages

        message = {"chat_id": chat_id, "message_content": message_text}
        result = messages_collection.insert_one(message)
    
    def get_chat(self, chat_id):
        chats_collection = self.database.chats
        chat_cursor = chats_collection.find_one({"chat_id": chat_id})

        if (chat_cursor is None):
            return None
        
        return Chat(chat_cursor["chat_id"], chat_cursor["chat_name"])

    # public method
    def get_all_chats_to_objects(self):
        chats = []

        chats_collection = self.database.chats

        chats_cursor = chats_collection.find({}, {'_id': 0})

        for chat_json in chats_cursor:
            chats.append(chat_json)
        
        return chats