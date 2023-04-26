# from chat import Chat
# from ..repositories.user_repository import UserRepository

class User:
    def __init__(self, id: str, username: str, email: str, display_name: str = None):
        self.id: str = id
        self.username: str = username
        self.email: str = email
        self.display_name: str = display_name
        self.opened_chat_id: int = None
        self.friends: list = []
        self.chats: list = []

    def to_object(self) -> object:
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "display_name": self.display_name,
            "opened_chat_id": self.opened_chat_id,
            "chats": self.chats,
            "friends": self.friends
        }

    def get_chats(self) -> list:
        if self.chats is None or self.chats.empty():
            pass
            # self.get_chats = UserRepository.get_user_chats(self)

        return self.chats

    def get_friends(self) -> list:
        if self.friends is None or self.friends.empty():
            pass
            # self.friends = UserRepository.get_user_friends(self)

        return self.friends
