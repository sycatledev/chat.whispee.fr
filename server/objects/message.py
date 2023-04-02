class Message:

    def __init__(self,uuid, chat_id, content, author = None):
        self.uuid = uuid
        self.chat_id = chat_id
        self.content = content
        self.author = author
    
    def to_json(self):
        return {
            "message_uuid": self.uuid,
            "chat_id": self.chat_id,
            "message_content": self.content,
            "message_author": self.author
        }