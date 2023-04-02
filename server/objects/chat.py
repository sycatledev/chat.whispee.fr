import json

class Chat:
    def __init__(self,id, name, pending_messages):
        self.id = id
        self.name = name
        self.pending_messages = pending_messages
        self.messages = []
        print(self)
    
    def add_message(self,message):
        self.messages.append(message)
        print(self.messages)

    def get_messages(self):
        return self.messages
    
    def get_messages_object(self):
        messages_list = []

        for message in self.messages:
            messages_list.append(message.to_json())
        
        return messages_list
    
    def to_json(self):
        return {
            "chat_id": self.id,
            "chat_name": self.name,
            "chat_messages": json.dumps(self.get_messages_object()),
            "chat_pending_messages": self.pending_messages,
        }