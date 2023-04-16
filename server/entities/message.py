import json

class Message:

    def __init__(self, id, author_id, chat_id, content, date):
        self.id = id
        self.author_id = author_id
        self.chat_id = chat_id
        self.content = content
        self.date = date

    def to_object(self):
        return {
            "id": self.id,
            "author_id": self.author_id,
            "chat_id": self.chat_id,
            "content": self.content,
            "date": json.dumps(self.date)
        }