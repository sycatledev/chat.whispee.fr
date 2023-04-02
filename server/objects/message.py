class Message:
    uuid = None
    chat_id = None
    content = None
    author = None
    status = False

    def __init__(self,uuid):
        self.uuid = uuid
    
    def to_json(self):
        return {
            "message_uuid": self.uuid,
            "chat_id": self.chat_id,
            "message_content": self.content,
            "message_author": self.author,
            "message_status": self.status
        }