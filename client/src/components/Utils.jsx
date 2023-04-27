import { useRef } from "react";
import { useState, useEffect } from "react";

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const useAppData = () => {
  const [webSocket, setWebSocket] = useState(null);
  const [pending, setPending] = useState(true);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState(null);
  const [singleChat, setSingleChat] = useState(false);
  const [ready, setReady] = useState(false);
  const [readyMessages, setReadyMessages] = useState(false);
  const [messageIds, setMessageIds] = useState([]);
  const [deletedMessage, setDeletedMessage] = useState(null);
  const [session, setSession] = useState(null);
  const [connectedUser, setConnectedUser] = useState(false);
  const [identify, setIdentify] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendReady, setFriendReady] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [delatedMessage, setDelatedMessage] = useState("");
  const [delated, setdelated] = useState(null);
  const [username, setUsername] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const currentChatRef = useRef(null);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const init = async () => {
    const ws = new WebSocket("ws://localhost:456/");
    ws.addEventListener("open", async (event) => {
      console.log("Connected to server");

      const sessionId = window.localStorage.getItem("session_id");
      let sessionData = {
        session_id: sessionId,
      };

      await sendSocketMessage(
        ws,
        "check_session|||" + JSON.stringify(sessionData)
      );

      if (currentChat != null) {
        let request = { chat_id: currentChat };
        await sendSocketMessage(ws, "load_chat|||" + JSON.stringify(request));
      }
      if (sessionId != null) {
        await sendSocketMessage(ws, "load_chats|||");
      }
    });
    ws.addEventListener("close", async (event) => {
      console.log("Lost connection to server");
    });
    ws.addEventListener("error", async (event) => {
      console.error("Websocket error", event);
    });
    ws.addEventListener("message", async (event) => {
      await handleSocketMessage(event.data);
    });
    setWebSocket(ws);
  };

  useEffect(() => {
    init();
  }, []);

  if (currentChatRef.current !== currentChat) {
    setReadyMessages(false);
    setMessages([]);
    setCurrentChat(currentChat);
    currentChatRef.current = currentChat;
  }

  const sendSocketMessage = async (ws, message) => {
    console.log("<< " + message);

    ws.send(message);
  };

  const handleSocketMessage = async (socketMessage) => {
    console.log(">> " + socketMessage);

    let socketContent = socketMessage.split("|||");
    let socketCommand = socketContent[0];
    let socketData = socketContent[1];

    if (socketCommand === "active_session") {
      let sessionData = JSON.parse(socketData);
      setSession(true);
      setPending(false);
      setUsername(sessionData.user.username);
    } else if (socketCommand === "session_inactive") {
      setSession(false);
      setPending(false);
    } else if (socketCommand === "chat_message_sended") {
      let messageData = JSON.parse(socketData);
      setNewMessage(messageData);
      setMessages((messages) => [...messages, messageData]);
    } else if (socketCommand === "chats_loaded") {
      let chatsData = JSON.parse(socketData);
      setChats(chatsData);
      setReady(true);
      setReadyMessages(true);
    } else if (socketCommand === "chat_loaded") {
      let chat_data = JSON.parse(socketData);
      setChat(chat_data);
      setSingleChat(true);
    } else if (socketCommand === "chat_messages_loaded") {
      let messagesDatas = JSON.parse(socketData);
      setMessages(messagesDatas);
      setReadyMessages(true);
    } else if (socketCommand === "chat_message_deleted") {
      let messageDate = JSON.parse(socketData);
      setReadyMessages(false);
      setDelatedMessage(messageDate);
      setdelated(true);
      setReadyMessages(true);
    } else if (socketCommand === "no_identifier_found") {
      // User not exist in database
      setIdentify(true);
      setRegister(true); // Redirect to register page
    } else if (socketCommand === "identifier_found") {
      let userData = JSON.parse(socketData);
      setUsername(userData.username);
      setIdentify(true);
      setLogin(true);
    } else if (socketCommand === "login_succeeded") {
      let sessionData = JSON.parse(socketData);

      window.localStorage.setItem("session_id", sessionData["session_id"]);
      setConnectedUser(true);
    } else if (socketCommand === "friends_loaded") {
      let friendsData = JSON.parse(socketData);
      setFriends(friendsData);
      setFriendReady(true);
    }
  };
  let sendChatMessage = async (chat_id, message) => {
    let data = {
      chat_id: chat_id,
      content: message,
    };

    await sendSocketMessage(
      webSocket,
      `send_chat_message|||${JSON.stringify(data)}`
    );
  };
  return {
    webSocket,
    session,
    init,
    sendChatMessage,
    handleSocketMessage,
    sendSocketMessage,
    messages,
    chats,
    chat,
    singleChat,
    ready,
    readyMessages,
    deletedMessage,
    connectedUser,
    identify,
    login,
    register,
    setLogin,
    setRegister,
    setIdentify,
    friends,
    friendReady,
    delatedMessage,
    username,
    currentChat,
    setCurrentChat,
    setReadyMessages,
    setMessages,
  };
};
