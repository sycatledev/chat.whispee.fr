import React, { useEffect, useRef } from "react";
import ChatSkeleton from "./ChatSkeleton.jsx";
import { Modal, Button } from "flowbite-react";
import { useState } from "react";
import { Tooltip } from "flowbite-react";
import { useAppData } from "../Utils.jsx";
const ChatContainer = ({currentChat, messages, ready, chat, readyMessages }) => {
  const chatContainerRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const inputRef = useRef(null);
  const {
    sendChatMessage
   
  } = useAppData()
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
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDDifferences = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference > 0) {
      const day = timeMls.getDate();
      const month = timeMls.getMonth() + 1;
      const year = timeMls.getFullYear();
      return `${day}/${month}/${year}`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
    } else if (minutesDDifferences > 0) {
      return `${minutesDDifferences} minute${
        minutesDDifferences > 1 ? "s" : ""
      } ago`;
    } else if (secondsDifference > 0) {
      return `${secondsDifference} second${
        secondsDifference > 1 ? "s" : ""
      } ago`;
    } else {
      return `just now`;
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const inputDatas = inputRef.current.value;
    console.log(messages)
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
        className="flex flex-row items-center h-16 lg:rounded-t-xl bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white duration-200 w-full px-2 shadow-sm border-b border-neutral-200 dark:border-neutral-700"
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
        <button className="flex items-center justify-center text-gray-500 dark:hover:text-gray-300 hover:text-black p-2 rounded-xl flex-shrink-0">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"></path>
          </svg>
        </button>
      </div>
      <div
        id="chat-content"
        className="flex flex-col h-full overflow-x-hidden p-4 my-2"
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
                  id={message.id}
                  className="col-start-1 lg:col-start-3 col-end-13 gap-3 p-3 rounded-lg group"
                >
                  <div className="items-center justify-start group">
                    <div className="flex-row-reverse flex">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-indigo-400 flex-shrink-0">
                        A
                      </div>
                      <div className="relative mx-3 text-sm bg-white text-black dark:bg-black dark:text-white py-2 px-4 shadow rounded-xl">
                        <div>{message.content}</div>
                        <div className="text-right ml-auto justify-end space-x-1 items-center text-xs text-gray-400">
                          <div>{messageTime(message.date)}</div>
                        </div>

                        <div
                          id="message-actions"
                          className="absolute -top-6 left-0 w-full hidden group-hover:inline-flex space-x-1 mb-2 mt-1"
                        >
                          <Tooltip
                            content="Delete this message"
                            animation="duration-200"
                          >
                            <button
                              onClick={() => setOpenModal(true)}
                              className="bg-slate-500 hover:bg-red-500 text-white p-1 rounded duration-200"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6Zm4 12H8v-9h2v9Zm6 0h-2v-9h2v9Zm.618-15L15 2H9L7.382 4H3v2h18V4h-4.382Z"></path>
                              </svg>
                            </button>
                          </Tooltip>

                          <Tooltip
                            content="Edit this message"
                            animation="duration-200"
                          >
                            <button className="bg-slate-500 hover:bg-yellow-500 text-white p-1 rounded">
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263ZM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414Z"></path>
                              </svg>
                            </button>
                          </Tooltip>
                        </div>
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
                                  handleDeleteChatMessage(message.message_id)
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
        className="flex flex-row items-center h-16 p-4 lg:rounded-b-xl bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white duration-200 w-full px-4 shadow-sm border-t border-neutral-200 dark:border-neutral-700"
      >
        <div className="flex-grow">
          <div className="relative w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5ZM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7Zm4 10.723V20h-2v-2.277a1.994 1.994 0 0 1 1.454-3.672 2 2 0 0 1 1.277 2.945 1.99 1.99 0 0 1-.731.727Z"></path>
                </svg>
              </div>

              <input
                type="text"
                id="chat-input"
                autoComplete="off"
                ref={inputRef}
                className="bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 text-sm outline-none rounded-lg disabled:cursor-not-allowed block w-full pl-10 p-2.5 duration-200"
                placeholder={`Send an encrypted message to ${chat?.chat_name}`}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 rounded-xl text-white ml-1 px-4 py-2 flex-shrink-0"
        >
          <svg
            className="w-6 h-6 -rotate-45"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="m21.426 11.096-17-8A.999.999 0 0 0 3.03 4.243l1.939 7.758-1.94 7.758a.998.998 0 0 0 1.397 1.147l17-8a1.001 1.001 0 0 0 0-1.81ZM5.48 18.198l.839-3.357 5.68-2.84-5.68-2.84-.84-3.357 13.17 6.197-13.17 6.197Z"></path>
          </svg>
        </button>
      </form>
    </>
  );
};

export default ChatContainer;
