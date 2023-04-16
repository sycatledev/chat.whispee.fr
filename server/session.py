from datetime import datetime
import json

class Session:
    def __init__(self, id, socket, user):
        self.session_id = id
        self.ip_address = socket.remote_address[0]
        self.socket = socket
        # self.creation_time = datetime.now()
        # self.session_duration = 3600 # Session valid for 1 hour
        self.user = user

    def to_object(self):
        return {
            "id": self.session_id,
            "ip_address": self.ip_address,
            # "creation_time": json.dumps(self.creation_time),
            # "session_duration": self.session_duration,
            # "session_validity": self.is_valid(),
            "user": self.user.to_object()
        }

    # def is_valid(self):
        # Check if session has expired
        # return (datetime.now() - self.creation_time).total_seconds() < self.session_duration