class Chat:
    id = 0
    name = "Chat"
    pending_messages = 0
    messages = list()

    def __init__(self,id):
        self.id = id
    
    def add_message(self,message):
        self.messages.append(message)

    def to_json(self):
        return {
            "chat_id": self.id,
            "chat_name": self.name,
            "chat_pending_messages": self.messages,
        }