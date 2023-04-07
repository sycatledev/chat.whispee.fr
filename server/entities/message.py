import json

class Message:

    def __init__(self,uuid, chat_id, content, date, author = None):
        self.uuid = uuid
        self.chat_id = chat_id
        self.content = content
        self.date = date
        self.author = author
    
    def to_json(self):
        return {
            "message_uuid": self.uuid,
            "chat_id": self.chat_id,
            "message_content": self.content,
            "message_date": json.dumps(self.date),
            "message_author": self.author
        }