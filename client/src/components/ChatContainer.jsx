import React, { useEffect, useRef } from "react";
import ChatSkeleton from "./ChatSkeleton.jsx";

const ChatContainer = ({
  ready,
  chat,
  readyMessages,
  sendChatMessage,
  currentChat,
  messages,
}) => {
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  function scrollToBottom() {
    chatContainerRef?.current?.scrollIntoView({
      block: "end",
    });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const inputDatas = inputRef.current.value;
    if (inputDatas.length < 1) return;
    if (inputDatas.trim() === "") return;
    sendChatMessage(currentChat, inputDatas);
    inputRef.current.value = "";
  };
  return (
    <>
      <div
        id="chat-header"
        className="flex flex-row items-center h-16 lg:rounded-t-xl bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white duration-300 w-full px-2"
      >
        <div className="flex-grow cursor-pointer">
          <div className="flex flex-row items-center relative w-full">
            <div className="flex items-center justify-center h-8 w-8 bg-indigo-400 text-white rounded-full">
              {ready && chat?.chat_name[0]}
            </div>
            <div className="ml-2 text-sm font-semibold">
              {ready && chat?.chat_name}
            </div>
          </div>
        </div>
        <button className="flex items-center justify-center text-gray-500 hover:text-gray-800 active:bg-indigo-200 dark:hover:text-gray-300 dark:active:bg-indigo-400 p-2 rounded-xl flex-shrink-0">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
            <path d="M12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
            <path d="M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
          </svg>
        </button>
      </div>
      <div
        id="chat-content"
        className="flex flex-col h-full overflow-x-auto p-4 my-2"
      >
        <div className="flex flex-col h-full rounded-2xl">
          <div
            ref={chatContainerRef}
            className="grid grid-cols-12 gap-y-2"
            id="messages-container"
          >
            {readyMessages ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  id={message.message_uuid}
                  className="col-start-9 col-end-13 p-3 rounded-lg"
                >
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-indigo-400 flex-shrink-0">
                      A
                    </div>
                    <div className="relative mr-3 text-sm bg-white text-black dark:bg-black dark:text-white py-2 px-4 shadow rounded-xl">
                      <div>{message.message_content}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <ChatSkeleton />
            )}
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmitForm}
        id="chat-form"
        className="flex flex-row items-center h-16 p-4 lg:rounded-b-xl bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white duration-300 w-full px-4"
      >
        <div className="flex-grow">
          <div className="relative w-full">
            <input
              ref={inputRef}
              type="text"
              autoComplete="off"
              placeholder={`Send a message to ${chat?.chat_name}`}
              className="flex w-full border rounded-xl bg-[#fefefe] dark:bg-[#121212] focus:outline-none focus:border-indigo-300 px-4 h-10"
              id="chat-input"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 rounded-xl text-white ml-1 px-4 py-2 flex-shrink-0"
        >
          <svg
            className="w-5 h-5 rotate-45"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </button>
      </form>
    </>
  );
};

export default ChatContainer;
