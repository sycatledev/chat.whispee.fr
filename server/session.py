from datetime import datetime

class Session:
    def __init__(self, id, socket, user):
        self.session_id = id
        self.ip_address = socket.remote_address[0]
        self.creation_time = datetime.now()
        self.session_duration = 3600 # Session valid for 1 hour
        self.user = user

    def to_json(self):
        return {
            "id": self.id,
            "ip_address": self.ip_address,
            "creation_time": self.creation_time,
            "creation_duration": self.creation_duration,
            # "user": self.user.to_json()
        }

    def is_valid(self):
        # Check if session has expired
        return (datetime.now() - self.creation_time).total_seconds() < self.session_duration