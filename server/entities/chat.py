class Chat:
    def __init__(self,id, name):
        self.id = id
        self.name = name
    
    # TODO: Add recipients and attachments
    def add_message(self, author_id, content, date):
        from server import get_database
        from entities.message import Message

        result_id = get_database().save_message(self.id, author_id, content, date)

        return Message(result_id, author_id, self.id, content, date)

    def get_messages(self):
        from server import get_database

        return get_database().get_messages_from_chat_id(self.id)
    
    def get_messages_objects(self):
        from server import get_database

        return get_database().get_messages_to_objects_from_chat_id(self.id)
    
    def to_object(self):
        return {
            "chat_id": self.id,
            "chat_name": self.name
        }