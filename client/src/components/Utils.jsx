import { useRef } from "react";
import { useState, useEffect } from "react"

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    )
}

export const useWebSocket = () => {
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState(null);
  const [singleChat, setSingleChat] = useState(false);
  const [ready, setReady] = useState(false);
  const [readyMessages, setReadyMessages] = useState(false);
  const [messageIds, setMessageIds] = useState([]);
  const [deletedMessage, setDeletedMessage] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [connectedUser, setConnectedUser] = useState(false);
  const [identify, setIdentify] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendReady, setFriendReady] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [delatedMessage, setDelatedMessage] = useState("");
  const [username, setUsername] = useState('')

  const currentChatRef = useRef(null);

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
      await sendSocketMessage(ws, "load_chats|||");
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
    setWebSocket(ws)
    console.log(webSocket)
  };
  useEffect(() => {
    init()
  }, [])
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

      setUsername(sessionData.user.username);
    } else if (socketCommand === "session_inactive") {
      setIsSessionActive(false)
    } else if (socketCommand === "active_session") {
      setIsSessionActive(true)
    } else if (socketCommand === "chat_message_sended") {
      let messageData = JSON.parse(socketData);

      if (!messageIds.includes(messageData.message_id)) {
        setMessageIds([...messageIds, messageData.message_id]);
        setMessages((messages) => [...messages, messageData]);
      }
    } else if (socketCommand === "chats_loaded") {
      let chatsData = JSON.parse(socketData);
      setChats(chatsData);
      setReady(true);
    } else if (socketCommand === "chat_loaded") {
      let chat_data = JSON.parse(socketData);
      setChat(chat_data);
      setSingleChat(true);
    } else if (socketCommand === "chat_messages_loaded") {
      let messages = JSON.parse(socketData);
      setMessages(messages);
      setReadyMessages(true);
    } else if (socketCommand === "chat_message_deleted") {
      let messageDate = JSON.parse(socketData);
      setReadyMessages(false);
      setDelatedMessage(messageDate);
      setdelated(true);
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
      setConnectedUser(true)
    } else if (socketCommand === "friends_loaded") {
      let friendsData = JSON.parse(socketData);
      setFriends(friendsData);
      setFriendReady(true);
    }
  };
  return { 
    webSocket,
    messages,
    chats,
    chat,
    singleChat,
    ready,
    readyMessages,
    deletedMessage,
    isSessionActive,
    connectedUser,
    identify,
    login,
    register,
    friends,
    friendReady,
    delatedMessage,
    sendSocketMessage,
    handleSocketMessage,
    username,
    init,
    currentChat,
    setCurrentChat,
    setReadyMessages,
    setMessages,
}
}