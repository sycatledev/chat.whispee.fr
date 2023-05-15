import React, { useContext, useEffect, useRef } from "react";
import MessagesSkeleton from "../skeletons/MessagesSkeleton.jsx";
import { Modal, Button } from "flowbite-react";
import { useState } from "react";
import { Tooltip } from "flowbite-react";
import { useAppData } from "../Utils.jsx";
import Avatar from "../user/Avatar.jsx";
import ChatFooter from "./ChatFooter.jsx";
import formatTimestampToTimeDifference from "../../utils/time.js";

const ChatContainer = ({
  handleSidebarToggle,
  currentChat,
  ready,
  chat,
  messages,
  deletedMessage,
  deleteChatMessage,
  setMessages,
  setReadyMessages,
  readyMessages,
  userId,
  username,
  newMessage,
  setNewMessage,
}) => {
  const chatContainerRef = useRef(null);
  const { sendChatMessage } = useAppData();
  const [openModal, setOpenModal] = useState(false);
  const inputRef = useRef(null);
  const audioRef = useRef(null);
  const sendRef = useRef(null);

  function scrollToBottom() {
    chatContainerRef?.current?.scrollIntoView({
      block: "end",
    });
  }
  useEffect(() => {
    setMessages(
      messages.filter(
        (message) =>
          JSON.parse(message._id || message.id).$oid !==
          deletedMessage?.message_id
      )
    ),
      setReadyMessages(true);
  }, [deletedMessage]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const inputDatas = inputRef.current.value;

    if (inputDatas.length < 1) return;
    if (inputDatas.trim() === "") return;

    inputRef.current.value = "";
    sendRef.current.play();
    sendChatMessage(currentChat, inputDatas);
  };

  const handleDeleteChatMessage = (chat_uuid) => {
    deleteChatMessage(chat_uuid);
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    scrollToBottom();
    if (newMessage) {
      if (JSON.parse(newMessage.sender_id).$oid !== userId) {
        audioRef.current.play();
      } else {
        sendRef.current.play();
      }
    }
  }, [newMessage]);
  return (
    <>
      <audio ref={audioRef}>
        <source src="./sounds/message_received.wav" type="audio/mpeg" />
      </audio>
      <audio ref={sendRef}>
        <source src="./sounds/message_sent.wav" type="audio/mpeg" />
      </audio>

      <div
        id="chat-header"
        className="flex flex-row items-center h-16 rounded-t-xl bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white duration-200 w-full px-2 shadow-sm border-b border-neutral-200 dark:border-neutral-700"
      >
        <button
          onClick={handleSidebarToggle}
          className="flex items-center justify-center text-gray-500 dark:hover:text-gray-300 hover:text-black rounded-xl mr-1 lg:mr-2"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18V6H3Z"></path>
          </svg>
        </button>

        <div className="flex-grow cursor-pointer">
          <div className="flex flex-row items-center relative w-full">
            {ready ? (
              <>
                <Avatar username={chat?.chat_name}></Avatar>
                <div className="ml-2 text-sm font-semibold select-none">
                  {chat?.chat_name}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button className="flex items-center justify-center text-gray-500 dark:hover:text-gray-300 hover:text-black p-2 rounded-xl">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 11c1.66 0 2.99-1.34 2.99-3S19.66 5 18 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86 0 1.07-.34 2.04-.9 2.86.28.09.59.14.91.14ZM8 10H5V7H3v3H0v2h3v3h2v-3h3v-2Zm7.99-2c0 1.66-1.33 3-2.99 3-1.66 0-3-1.34-3-3s1.34-3 3-3 2.99 1.34 2.99 3Zm3.63 5.16c.83.73 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.37-2.49-4.38-2.84ZM7 16c0-2 4-3 6-3s6 1 6 3v2H7v-2Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button className="flex items-center justify-center text-gray-500 dark:hover:text-gray-300 hover:text-black p-2 rounded-xl">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        id="chat-content"
        className="flex flex-col h-full overflow-x-hidden p-4"
      >
        <div className="flex flex-col h-full rounded-2xl">
          <ul
            ref={chatContainerRef}
            className="grid grid-cols-12 gap-y-2"
            id="messages-container"
          >
            {readyMessages ? (
              messages.map((message, index) => (
                <li
                  key={index}
                  id={JSON.parse(message._id || message.id).$oid}
                  className={
                    JSON.parse(message.sender_id).$oid !== userId
                      ? "col-start-1 lg:col-start-1 col-end-13 gap-3 p-3 rounded-lg group"
                      : "col-start-1 lg:col-start-3 col-end-13 gap-3 p-3 rounded-lg group"
                  }
                >
                  <div className="items-center justify-start group">
                    <div
                      className={
                        JSON.parse(message.sender_id).$oid !== userId
                          ? "flex"
                          : "flex-row-reverse flex"
                      }
                    >
                      {ready ? (
                        <Avatar username={username} size={10}></Avatar>
                      ) : (
                        ""
                      )}

                      <div className="relative mx-3 text-sm bg-white text-black dark:bg-black dark:text-white py-2 px-4 shadow rounded-xl">
                        <div>{message.content}</div>

                        <div
                          className={
                            (JSON.parse(message.sender_id).$oid !== userId
                              ? "text-right"
                              : "text-left") +
                            "ml-auto justify-end space-x-1 items-center text-xs text-gray-400"
                          }
                        >
                          <div>
                            {formatTimestampToTimeDifference(message.date)}
                          </div>
                        </div>

                        {JSON.parse(message.sender_id).$oid == userId ? (
                          <div
                            id="message-actions"
                            className="absolute -top-4 left-0 w-full hidden group-hover:inline-flex space-x-1 mb-2 mt-1"
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
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      {JSON.parse(message.sender_id).$oid == userId ? (
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
                                    Are you sure you want to delete this message
                                    ?
                                  </p>
                                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"></p>
                                </div>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  className="bg-rose-950"
                                  color="gray"
                                  onClick={() =>
                                    handleDeleteChatMessage(
                                      JSON.parse(message._id || message.id).$oid
                                    )
                                  }
                                >
                                  I accept
                                </Button>
                                <Button color="gray" onClick={handleCloseModal}>
                                  Decline
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </React.Fragment>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <MessagesSkeleton />
            )}
          </ul>
        </div>
      </div>
      <ChatFooter
        chat={chat}
        inputRef={inputRef}
        handleSubmitForm={handleSubmitForm}
      />
    </>
  );
};

export default ChatContainer;
