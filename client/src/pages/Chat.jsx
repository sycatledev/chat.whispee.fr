import React, { useEffect, useRef, useState } from "react";
import * as Utils from "../utils/generator.js";
import * as Cookies from "../utils/cookies.js";
import Nav from "../components/Nav.jsx";
import Chats from "../components/Chats.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import EmptyChatContainer from "../components/EmptyChatContainer.jsx";
import { Friend } from "../components/Friend.jsx";
import ProfilContainer from "../components/ProfilContainer.jsx";
import ParamsModal from "../components/ParamsModal.jsx";

const Chat = () => {
  const [websocket, setWebsocket] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [chat, setChat] = useState([]);
  const [chats, setChats] = useState([]);
  const [ready, setReady] = useState(false);
  const [singleChat, setSingleChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [readyMessages, setReadyMessages] = useState(false);
  const [messageIds, setMessageIds] = useState([]);
  const [messageNav, setMessageNav] = useState(true);
  const [friendNav, setFriendNav] = useState(false);
  const [paramNav, setParamNav] = useState(false);
  const [showParams, setShowParams] = useState(false);
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [delated, setdelated] = useState(false);
  const [delatedMessage, setDelatedMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const cookieTheme = Cookies.cookieManager.getCookie("theme");
    setIsDark(cookieTheme === "dark" || prefersDarkMode);
  }, []);

  function toggleTheme() {
    setIsDark((prevIsDark) => !prevIsDark);
  }

  useEffect(() => {
    setTheme(isDark);
  }, [isDark]);

  function setTheme(dark) {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    Cookies.cookieManager.setCookie("theme", dark ? "dark" : "light");
  }
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
        setWebsocket(ws);
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
    };
    init();
  }, []);
  const displayChat = async (id) => {
    await loadChat(id);
  };
  const handleSocketMessage = async (socketMessage) => {
    console.log(">> " + socketMessage);

    let socketContent = socketMessage.split("|||");
    let socketCommand = socketContent[0];
    let socketData = socketContent[1];

    if (socketCommand === "active_session") {
      let sessionData = JSON.parse(socketData);

      await handleUsername(sessionData.user.username).finally(() => {
        console.log(username);
      });
    } else if (socketCommand === "chat_message_sended") {
      let messageData = JSON.parse(socketData);

      if (!messageIds.includes(messageData.message_uuid)) {
        setMessageIds([...messageIds, messageData.message_uuid]);
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
    }
  };
  useEffect(() => {
    if (delated) {
      setMessages(
        messages.filter(
          (message) => message.message_uuid !== delatedMessage?.message_uuid
        )
      ),
        setReadyMessages(true);
    }
  }, [delatedMessage]);

  const sendSocketMessage = async (ws, message) => {
    console.log("<< " + message);

    ws.send(message);
  };

  const loadChat = async (chat_id) => {
    if (currentChat === chat_id) return;
    if (chat_id === null) return;
    setCurrentChat(chat_id);
    let request = { chat_id: chat_id };
    await sendSocketMessage(
      websocket,
      "load_chat|||" + JSON.stringify(request)
    );
  };

  const sendChatMessage = async (chat_id, message) => {
    let data = {
      chat_id: chat_id,
      message_uuid: Utils.generateUUID(),
      message_content: message,
    };

    await sendSocketMessage(
      websocket,
      `send_chat_message|||${JSON.stringify(data)}`
    );
  };
  const deleteChatMessage = async (message_uuid) => {
    let data = {
      message_uuid,
    };
    await sendSocketMessage(
      websocket,
      `delete_chat_message|||${JSON.stringify(data)}`
    );
  };

  const handleUsername = async (socket_username) => {
    setUsername(socket_username);
  };

  return (
    <div
      className={`bg-[#fefefe] dark:bg-[#080808] text-black dark:text-white duration-200 overflow-x-hidden`}
    >
      {showParams ? (
        <ParamsModal showParams={showParams} setShowParams={setShowParams} />
      ) : (
        ""
      )}
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="hidden lg:flex flex-col justify-between p-6 w-64 text-black dark:text-white bg-[#f7f7f7] dark:bg-[#1c1c1c] duration-200 flex-shrink-0">
            <div className="h-full">
              <Nav
                messageNav={messageNav}
                setMessageNav={setMessageNav}
                paramNav={paramNav}
                setParamNav={setParamNav}
                friendNav={friendNav}
                setFriendNav={setFriendNav}
              />
              <Chats
                chats={chats}
                ready={ready}
                displayChat={displayChat}
                messages={messages}
                messageNav={messageNav}
              />
              <Friend friendNav={friendNav} />
            </div>
            <ProfilContainer
              toggle={toggleTheme}
              showParams={showParams}
              setShowParams={setShowParams}
            />
          </div>
          <div></div>
          <div className="flex flex-col flex-auto h-full lg:p-6">
            <div
              id="chat-wrapper"
              className="flex flex-col flex-auto flex-shrink-0 lg:rounded-2xl h-full bg-[#f7f7f7] dark:bg-[#1c1c1c]"
            >
              {singleChat ? (
                <ChatContainer
                  ready={ready}
                  chat={chat}
                  readyMessages={readyMessages}
                  sendChatMessage={sendChatMessage}
                  currentChat={currentChat}
                  messages={messages}
                  deleteChatMessage={deleteChatMessage}
                />
              ) : (
                <EmptyChatContainer />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
