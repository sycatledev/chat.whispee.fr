import json

class Message:

    def __init__(self, id, sender_id, chat_id, content, date):
        self.id = id
        self.sender_id = sender_id
        self.chat_id = chat_id
        self.content = content
        self.date = date

    def to_object(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "chat_id": self.chat_id,
            "content": self.content,
            "date": json.dumps(self.date)
        }