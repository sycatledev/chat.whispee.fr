import React, { useEffect, useState } from "react";
import functions from "../utils/functions.js";
import * as Utils from "../utils/generator.js";

const Chat = () => {
  const [websocket, setWebsocket] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatsContainer, setChatsContainer] = useState(null);
  const [chats, setChats] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const ws = new WebSocket("ws://localhost:456/");
      ws.addEventListener("open", async (event) => {
        console.log("Connected to server");

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
  }, [currentChat]);

  const displayChat = async (id) => {
    await loadChat(id);
  };
  const handleSocketMessage = async (socketMessage) => {
    console.log(">> " + socketMessage);
    let socketContent = socketMessage.split("|||");
    let socketCommand = socketContent[0];
    let socketData = socketContent[1];

    if (socketCommand === "chat_message_sended") {
      let messageData = JSON.parse(socketData);

      createChatMessageElement(
        messageData.message_uuid,
        messageData.message_content
      );
    } else if (socketCommand === "loaded_chats") {
      let chatsData = JSON.parse(socketData);
      setChats(chatsData);
      setReady(true);
      for (let index of chats) {
        let chat = chats[index];
        /*         createChatListElement(
          chat.chat_id,
          chat.chat_name,
          chat.chat_pending_messages
        ); */
      }
    } else if (socketCommand === "chat_loaded") {
      let chat_data = JSON.parse(socketData);
      await updateChatElement(chat_data);
    }
  };

  const sendSocketMessage = async (ws, message) => {
    console.log("<< " + message);

    ws.send(message);
  };

  const loadChat = async (chat_id) => {
    if (currentChat === chat_id) return;

    setCurrentChat(chat_id);

    let request = { chat_id: currentChat };
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
  async function updateChatElement(chat) {
    console.log(chat);
    let firstNameLetter = chat.chat_name[0];
    let chatHeader = document.getElementById("chat-header");
    let messagesContainer = document.getElementById("messages-container");
    let chatForm = document.getElementById("chat-form");

    let messages = JSON.parse(chat.chat_messages);

    chatHeader.innerHTML = `
      <div class="flex-grow cursor-pointer">
          <div class="flex flex-row items-center relative w-full">
              <div class="flex items-center justify-center h-8 w-8 bg-indigo-400 text-white rounded-full">
                  ${firstNameLetter}
              </div>
              <div class="ml-2 text-sm font-semibold">
                  ${chat.chat_name}
              </div>
          </div>
      </div>
      <button class="flex items-center justify-center text-gray-500 hover:text-gray-800 active:bg-indigo-200 dark:hover:text-gray-300 dark:active:bg-indigo-400 p-2 rounded-xl flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
              <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z">
              </path>
              <path d="M12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z">
              </path>
              <path d="M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z">
              </path>
          </svg>
      </button>`;

    messagesContainer.innerHTML = ``;

    for (let message in messages) {
      messagesContainer.insertAdjacentHTML(
        "beforeend",
        `
          <div id="${messages[message].message_uuid}" class="col-start-9 col-end-13 p-3 rounded-lg">
              <div class="flex items-center justify-start flex-row-reverse">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full text-white bg-indigo-400 flex-shrink-0">
                      A
                  </div>
                  <div class="relative mr-3 text-sm bg-white text-black dark:bg-black dark:text-white py-2 px-4 shadow rounded-xl">
                      <div>${messages[message].message_content}</div>
                  </div>
              </div>
          </div>
      `
      );
    }

    chatForm.innerHTML = `<div class="flex-grow">
          <div class="relative w-full">
          <input
              type="text"
              autocomplete="off"
              placeholder="Send a message to ${chat.chat_name}"
              class="flex w-full border rounded-xl bg-[#fefefe] dark:bg-[#121212] focus:outline-none focus:border-indigo-300 px-4 h-10"
              id="chat-input"
          />
          </div>
      </div>
      <button
          class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 rounded-xl text-white ml-1 px-4 py-2 flex-shrink-0"
      >
          <svg
          class="w-5 h-5 rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
          </svg>
      </button>`;

    let input = document.getElementById("chat-input");

    chatForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let message = input.value;
      console.log(message);

      if (message.length < 1) return;
      if (message.trim() === "") return;

      input.value = "";
      sendChatMessage(currentChat, message);
    });
  }

  async function createChatMessageElement(uuid, content) {
    // <div class="col-start-1 col-end-8 p-3 rounded-lg">
    //     <div class="flex flex-row items-center">
    //         <img src="https://api.lorem.space/image/face?w=150&h=150" class="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full">
    //         <div class="relative ml-3 text-sm bg-white dark:bg-black text-black dark:text-white duration-300 py-2 px-4 shadow rounded-xl">
    //         <div>
    //             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae unde aliquid, laboriosam provident reiciendis autem?
    //         </div>
    //         </div>
    //     </div>
    // </div>

    let messagesContainer = document.getElementById("messages-container");

    messagesContainer.insertAdjacentHTML(
      "beforeend",
      `
          <div id="${uuid}" class="col-start-6 col-end-13 p-3 rounded-lg">
              <div class="flex items-center justify-start flex-row-reverse">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full text-white bg-indigo-400 flex-shrink-0">
                      A
                  </div>
                  <div class="relative mr-3 text-sm bg-white text-black dark:bg-black dark:text-white py-2 px-4 shadow rounded-xl">
                      <div>${content}</div>
                  </div>
              </div>
          </div>
      `
    );

    const newMessage = document.getElementById(uuid);
    newMessage.scrollIntoView();
  }
  return (
    <div className="bg-[#fefefe] dark:bg-[#080808] text-black dark:text-white duration-500">
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="hidden lg:flex flex-col p-6 w-64 bg-[#fefefe] dark:bg-[#080808] text-black dark:text-white duration-300 flex-shrink-0">
            <div className="flex flex-row items-center h-16 rounded-t-xl bg-[#fefefe] dark:bg-[#080808] text-black dark:text-white duration-300 w-full justify-between">
              <button className="text-gray-500 hover:text-gray-800 active:bg-indigo-200 dark:hover:text-gray-300 dark:active:bg-indigo-400 p-2 rounded-xl">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
                  <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                  <path d="M16 3.133a4 4 0 0 1 0 7.75"></path>
                  <path d="M21 20.998v-2a4 4 0 0 0-3-3.85"></path>
                </svg>
              </button>
              <button
                id="theme-button"
                className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 dark:active:bg-indigo-400 active:bg-indigo-200 p-2 rounded-xl"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 9a3 3 0 0 0 0 6V9Z"></path>
                  <path d="M6 6h3.5L12 3.5 14.5 6H18v3.5l2.5 2.5-2.5 2.5V18h-3.5L12 20.5 9.5 18H6v-3.5L3.5 12 6 9.5V6Z"></path>
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-800 active:bg-indigo-200 dark:hover:text-gray-300 dark:active:bg-indigo-400 p-2 rounded-xl">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.723 1.723 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065Z"></path>
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col my-4">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Chats </span>
                <span
                  id="active-chats-numbers"
                  className="flex items-center justify-center bg-indigo-300 dark:bg-indigo-700 h-4 w-4 rounded-full"
                >
                  {chats.length}
                </span>
              </div>
              <div
                className="flex flex-col space-y-1 mt-4 -mx-2 h-[22rem] overflow-y-auto"
                id="chats-container"
              >
                {ready ? (
                  chats.map((chat) => (
                    <button
                      onClick={() => displayChat(chat.chat_id)}
                      key={chat.chat_id}
                      data-user-id={chat.chat_id}
                      className="chat-button flex flex-row items-center hover:bg-indigo-100 active:bg-indigo-200 dark:hover:bg-indigo-500 dark:active:bg-indigo-600 rounded-xl p-2"
                    >
                      <div className="flex items-center justify-center h-8 w-8 bg-indigo-400 text-white rounded-full">
                        {chat.chat_name[0]}
                      </div>
                      <div className="ml-2 text-sm font-semibold">
                        {chat.chat_name}
                      </div>

                      {chat.chat_pending_messages > 0 ? (
                        <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                          {chat.chat_pending_messages}
                        </div>
                      ) : (
                        ""
                      )}
                    </button>
                  ))
                ) : (
                  <>
                    <div className="animate-pulse flex space-x-4 items-center p-2">
                      <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
                      </div>
                    </div>

                    <div className="animate-pulse flex space-x-4 items-center p-2">
                      <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
                      </div>
                    </div>

                    <div className="animate-pulse flex space-x-4 items-center p-2">
                      <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
                      </div>
                    </div>

                    <div className="animate-pulse flex space-x-4 items-center p-2">
                      <div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full lg:p-6">
            <div
              id="chat-wrapper"
              className="flex flex-col flex-auto flex-shrink-0 lg:rounded-2xl h-full bg-gradient-to-tl from-[#f8f6ff] to-[#e9e2ff] dark:from-[#2e2e2e] dark:to-black"
            >
              <div
                id="chat-header"
                className="flex flex-row items-center h-16 lg:rounded-t-xl bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white duration-300 w-full px-2"
              ></div>
              <div
                id="chat-content"
                className="flex flex-col h-full overflow-x-auto p-4 my-2"
              >
                <div className="flex flex-col h-full rounded-2xl">
                  <div
                    className="grid grid-cols-12 gap-y-2"
                    id="messages-container"
                  ></div>
                </div>
              </div>
              <form
                id="chat-form"
                className="flex flex-row items-center h-16 p-4 lg:rounded-b-xl bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white duration-300 w-full px-4"
              ></form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
