import * as Utils from "./utils/generator.js";
import * as Theme from "./utils/theme.js";

let websocket;
let current_chat = null;
let chatsContainer;

async function init() {
  websocket = new WebSocket("ws://localhost:456/");

  websocket.addEventListener("open", async (event) => {
    console.log("Connected to server");

    if (current_chat != null) {
      let request = { chat_id: current_chat };
      await sendSocketMessage("load_chat|||" + JSON.stringify(request));
    }

    await sendSocketMessage("load_chats|||");
  });

  websocket.addEventListener("close", async (event) => {
    console.log("Lost connection to server");
  });

  websocket.addEventListener("error", async (event) => {
    console.error("Websocket error", event);
  });

  websocket.addEventListener("message", async (event) => {
    await handleSocketMessage(event.data);
  });
}

//messages reçu depuis le serveur
async function handleSocketMessage(socketMessage) {
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
  } else if (socketCommand === "chats_loaded") {
    let chatsData = JSON.parse(socketData);

    chatsContainer = document.getElementById("chats-container");
    chatsContainer.innerHTML = ``;

    for (let index in chatsData) {
      let chat = chatsData[index];
      createChatListElement(
        chat.chat_id,
        chat.chat_name,
        chat.chat_pending_messages
      );
    }

    let chatsElements = document.querySelectorAll(".chat-button");

    chatsElements.forEach(function (button) {
      button.addEventListener("click", async () => {
        const userId = button.getAttribute("data-user-id");

        await loadChat(userId);
      });
    });

    let chatsNumber = document.getElementById("active-chats-numbers");
    chatsNumber.innerText = chatsElements.length;
  } else if (socketCommand === "chat_loaded") {
    let chat_data = JSON.parse(socketData);

    await updateChatElement(chat_data);
  } else if (socketCommand === "chat_messages_loaded") {
    let messages = JSON.parse(socketData);

    for (let message of messages) {
      await createChatMessageElement(
        Utils.generateUUID(),
        message.message_text
      );
    }


  }
}

// envoyer
async function sendSocketMessage(message) {
  console.log("<< " + message);

  websocket.send(message);
}

async function loadChat(chat_id) {
  if (current_chat === chat_id) return;

  current_chat = chat_id;

  let request = { chat_id: current_chat };
  await sendSocketMessage("load_chat|||" + JSON.stringify(request));
}

async function sendChatMessage(chat_id, message) {
  let data = {
    chat_id: chat_id,
    message_uuid: Utils.generateUUID(),
    message_content: message,
  };

  await sendSocketMessage(`send_chat_message|||${JSON.stringify(data)}`);
}

async function updateChatElement(chat) {
  let firstNameLetter = chat.chat_name[0];

  let chatHeader = document.getElementById("chat-header");
  let messagesContainer = document.getElementById("messages-container");
  let chatForm = document.getElementById("chat-form");

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

    if (message.length < 1) return;
    if (message.trim() === "") return;

    input.value = "";
    sendChatMessage(current_chat, message);
  });
}

async function createChatListElement(id, name, pending_messages) {
  let firstNameLetter = name[0];

  chatsContainer.insertAdjacentHTML(
    "beforeend",
    `
        <button data-user-id="${id}" class="chat-button flex flex-row items-center hover:bg-indigo-100 active:bg-indigo-200 dark:hover:bg-indigo-500 dark:active:bg-indigo-600 rounded-xl p-2">
            <div class="flex items-center justify-center h-8 w-8 bg-indigo-400 text-white rounded-full">
                ${firstNameLetter}
            </div>
            <div class="ml-2 text-sm font-semibold">${name}
            </div> 
            ${pending_messages > 0
      ? `<div class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                ${pending_messages}
            </div>`
      : ""
    }
        </button>
    `
  );
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

document.addEventListener("DOMContentLoaded", init);