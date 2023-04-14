import React, { useEffect, useRef } from "react";
import ChatSkeleton from "./ChatSkeleton.jsx";
import { Modal, Button } from "flowbite-react";
import { useState } from "react";
const ChatContainer = ({
  ready,
  chat,
  readyMessages,
  sendChatMessage,
  currentChat,
  messages,
  deleteChatMessage,
}) => {
  const chatContainerRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const inputRef = useRef(null);
  function scrollToBottom() {
    chatContainerRef?.current?.scrollIntoView({
      block: "end",
    });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const messageTime = (time) => {
    const timeMls = new Date(time * 1000);
    const timeDifference = new Date() - timeMls;
    const minutesDDifferences = Math.floor(timeDifference / (1000 * 60));
    if (minutesDDifferences >= 60) {
      const day = timeMls.getDate();
      const month = timeMls.getMonth() + 1;
      const year = timeMls.getFullYear();
      const hours = timeMls.getHours();
      const minutes = timeMls
        .getMinutes()
        .toString()
        .slice(-2)
        .padStart(2, "0");
      return `reçu le ${day}-${month}-${year} ${hours}:${minutes}`;
    } else if (minutesDDifferences <= 0) {
      return `reçu à l'instant`;
    }
    return `reçu depuis ${minutesDDifferences} minutes`;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const inputDatas = inputRef.current.value;
    if (inputDatas.length < 1) return;
    if (inputDatas.trim() === "") return;
    sendChatMessage(currentChat, inputDatas);
    inputRef.current.value = "";
  };
  const handleDeleteChatMessage = (chat_uuid) => {
    deleteChatMessage(chat_uuid);
    setOpenModal(false);
  };
  const handdleCloseModal = () => {
    setOpenModal(false);
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
                  className="col-start-9 col-end-13 p-3 rounded-lg group"
                >
                  <div className="flex items-center justify-start flex-row-reverse group">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-indigo-400 flex-shrink-0">
                      A
                    </div>
                    <div className="relative mr-3 text-sm bg-white text-black dark:bg-black dark:text-white py-2 px-4 shadow rounded-xl">
                      <div>{message.message_content}</div>
                    </div>
                    <div className="flex items-center justify-center h-10 w-60  text-white bg-indigo-400 flex-shrink-0">
                      {messageTime(message.message_date)}
                    </div>

                    <div
                      onClick={() => setOpenModal(true)}
                      className=" items-center justify-center h-10 w-10 rounded-full text-white  flex-shrink-0 cursor-pointer hidden group-hover:flex "
                    >
                      <svg
                        width="20"
                        height="46"
                        fill="none"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4 7h16"></path>
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                        <path d="m5 7 1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                        <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                      </svg>
                    </div>
                    <div className="modal">
                      <React.Fragment>
                        <Modal
                          show={openModal}
                          onClose={() => setOpenModal(false)}
                        >
                          <Modal.Header>Delete a message</Modal.Header>
                          <Modal.Body>
                            <div className="space-y-6">
                              <p className="text-base leading-relaxed text-gray-900 dark:text-gray-400">
                                Are you sure you want to delete this message ?
                              </p>
                              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"></p>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              className="bg-rose-950"
                              color="gray"
                              onClick={() =>
                                handleDeleteChatMessage(message.message_uuid)
                              }
                            >
                              I accept
                            </Button>
                            <Button color="gray" onClick={handdleCloseModal}>
                              Decline
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </React.Fragment>
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
