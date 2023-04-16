class User:
    def __init__(self, id, username, email, display_name = None):
        self.id = id
        self.username = username
        self.email = email
        self.display_name = display_name

    def to_json(self) -> object:
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "display_name": self.display_name
        }