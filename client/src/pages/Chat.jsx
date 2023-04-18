import React, { useEffect, useRef, useState } from "react";
import * as Cookies from "../utils/cookies.js";
import Nav from "../components/Nav.jsx";
import { useNavigate } from "react-router-dom";
import Chats from "../components/nav/Chats.jsx";
import ChatContainer from "../components/chats/ChatContainer.jsx";
import EmptyChatContainer from "../components/chats/EmptyChatContainer.jsx";
import { Friend } from "../components/nav/Friends.jsx";
import ProfilContainer from "../components/ProfilContainer.jsx";
import ParamsModal from "../components/ParamsModal.jsx";
import ProfilModal from "../components/ProfilModal.jsx";

export default function Chat({
  webSocket,
  chat,
  chats,
  ready,
  singleChat,
  delated,
  delatedMessage,
  username,
  currentChat,
  setCurrentChat,
  messages,
  readyMessages,
  setReadyMessages,
  setMessages,
}){

  const [isDark, setIsDark] = useState(false);
  const [messageNav, setMessageNav] = useState(true);
  const [friendNav, setFriendNav] = useState(false);
  const [paramNav, setParamNav] = useState(false);
  const [showProfil, setShowProfil] = useState(false)
  const [showParams, setShowParams] = useState(false);
  const navigate = useNavigate()

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

  
  useEffect(() => {
    if(!window.localStorage.getItem('session_id')){
        navigate('/')
      }
    return () => {
      
    }
  }, [])

  useEffect(() => {
    if (delated) {
      setMessages(
        messages.filter(
          (message) => message.message_id !== delatedMessage?.message_id
        )
      ),
        setReadyMessages(true);
    }
  }, [delatedMessage]);


  function setTheme(dark) {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    Cookies.cookieManager.setCookie("theme", dark ? "dark" : "light");
  }
  const displayChat = async (id) => {
    await loadChat(id);
  };


  let sendSocketMessage = async (ws, message) => {
    console.log("<< " + message);

    ws.send(message);
  };

  const loadChat = async (chat_id) => {
    if (currentChat === chat_id) return;
    if (chat_id === null) return;
    setCurrentChat(chat_id);
    let request = { chat_id: chat_id };
    await sendSocketMessage(
      webSocket,
      "load_chat|||" + JSON.stringify(request)
    );
  };

  const sendChatMessage = async (chat_id, message) => {
    let data = {
      chat_id: chat_id,
      content: message,
    };

    await sendSocketMessage(
      webSocket,
      `send_chat_message|||${JSON.stringify(data)}`
    );
  };
  const deleteChatMessage = async (message_id) => {
    let data = {
      message_id,
    };
    await sendSocketMessage(
      webSocket,
      `delete_chat_message|||${JSON.stringify(data)}`
    );
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
      {showProfil ? (
        <ProfilModal showProfil={showParams} setShowProfil={setShowProfil} />
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
              showProfil={showProfil}
              setShowProfil={setShowProfil}
              username={username}
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
