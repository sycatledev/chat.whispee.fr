import { useState } from "react";
import Authentification from "./pages/Authentification.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat.jsx";
import { useEffect } from "react";
import { useAppData } from "./components/Utils.jsx";

export default function App() {
  
  const [currentChat, setCurrentChat] = useState(null);
  const {
    messages,
    chats,
    chat,
    singleChat,
    ready,
    readyMessages,
    init,
  } = useAppData();

  useEffect(() => {
    init()
    console.log(messages)
  }, [])

  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authentification/>} />
            <Route path="/app" element={<Chat 
            chat={chat}
            chats={chats}
            ready={ready}
            singleChat={singleChat}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            messages={messages}
            readyMessages={readyMessages}
            />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}