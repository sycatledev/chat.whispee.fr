import { useState } from "react";
import Authentification from "./pages/Authentification.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat.jsx";
import { useEffect } from "react";

export default function App() {

  const [webSocket, setWebSocket] = useState(null)
  const [chat, setChat] = useState([]);
  const [chats, setChats] = useState([]);
  const [ready, setReady] = useState(false);
  const [singleChat, setSingleChat] = useState(false);
  const [messageIds, setMessageIds] = useState([]);
  const [delated, setdelated] = useState(false);
  const [delatedMessage, setDelatedMessage] = useState("");
  const [username, setUsername] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [readyMessages, setReadyMessages] = useState(false);
  const [session, setSession] = useState(false)
  const [identify, setIdentify] = useState(null);
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [connectedUser, setConnectedUser] = useState(false)

    useEffect(() => {
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
          setWebSocket(ws);
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
      };
      init();
    }, []);

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
        setSession(false)
      } else if (socketCommand === "active_session") {
        setSession(true)
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
      }
    };


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentification
          webSocket={webSocket}
          identify={identify}
          register={register}
          username={username}
          login={login}
          handleSocketMessage={handleSocketMessage}
          />} />
          <Route path="/app" element={<Chat 
          webSocket={webSocket}
          setWebSocket={setWebSocket}
          chat={chat}
          chats={chats}
          ready={ready}
          singleChat={singleChat}
          delated={delated}
          delatedMessage={delatedMessage}
          username={username}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          messages={messages}
          readyMessages={readyMessages}
          setReadyMessages={setReadyMessages}
          setMessages={setMessages}
          session={session}
          setSession={setSession}
          />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}