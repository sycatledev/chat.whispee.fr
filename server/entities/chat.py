class Chat:
    def __init__(self,id, name):
        self.id = id
        self.name = name
    
    def add_message(self,message):
        from server import get_database

        get_database().save_message(self.id, message.uuid, message.content, message.date)

    def get_messages(self):
        from server import get_database

        return get_database().get_messages_from_chat_id(self.id)
    
    def get_messages_objects(self):
        from server import get_database

        return get_database().get_messages_to_objects_from_chat_id(self.id)
    
    def to_json(self):
        return {
            "chat_id": self.id,
            "chat_name": self.name
        }