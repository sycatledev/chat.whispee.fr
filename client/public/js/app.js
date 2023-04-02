import * as Utils from "./utils.js";
// import * as Cookies from "./cookies.js";
import * as Theme from './theme.js';

var websocket;
var current_chat = null;
let chat_form;
let input;
var chatMessages;
var chatsContainer;

async function init() {
    websocket = new WebSocket("ws://localhost:456/");
    chat_form = document.getElementById("chat-form");
    input = document.getElementById("chat-input");
    chatMessages = document.getElementById("chat-messages");
    chatsContainer = document.getElementById("chats-container");

    websocket.addEventListener("open", async (event) => {
        console.log("Connected to server");

        if (current_chat != null) {
            let request = { chat_id: current_chat }
            await sendSocketMessage("load_chat|||" + JSON.stringify(request));
        }
        
        await sendSocketMessage("load_chats|||")
    });

    websocket.addEventListener("close", async (event) => {
        console.log("Lost connection to server");
    });

    websocket.addEventListener("error", async (event) => {
        console.error("Websocket error", event)
    });

    websocket.addEventListener("message", async (event) => {
        await handleSocketMessage(event.data)
    });

    chat_form.addEventListener("submit", (event) => {
        event.preventDefault();

        let message = input.value;

        if (message.length < 1) return;

        input.value = "";
        sendChatMessage(current_chat, message)
    })
}

async function handleSocketMessage(socketMessage)
{
    console.log(">> " + socketMessage)
    let socketContent = socketMessage.split('|||');
    let socketCommand = socketContent[0];
    let socketData = socketContent[1];

    if (socketCommand === 'chat_message_sended')
    {
        let messageData = JSON.parse(socketData);

        createChatMessageElement(messageData.message_uuid, messageData.message_content)
    } 
    else if (socketCommand === "loaded_chats") 
    {
        let chatsData = JSON.parse(socketData);

        for (let index in chatsData)
        {
            let chat = chatsData[index];
            createChatElement(chat.chat_id, chat.chat_name, chat.chat_pending_messages)
        }

        let chatsElements = document.querySelectorAll('.chat-button');

        chatsElements.forEach(function(button)
        {
            button.addEventListener('click', async () =>
            {
                const userId = button.getAttribute('data-user-id');

                await loadChat(userId);
            });
        });

        let chatsNumber = document.getElementById('active-chats-numbers');
        chatsNumber.innerText = chatsElements.length;
    }
    else if (socketCommand === 'chat_loaded')
    {
        let messages = JSON.parse(socketData);

        for (let index in messages) {
            let message = messages[index];
            createChatMessageElement(message.message_uuid, message.message_content)
        }
    }
}

async function sendSocketMessage(message)
{
    console.log("<< " + message)

    websocket.send(message)
}

async function loadChat(chat_id)
{
    current_chat = chat_id;

    let request = { chat_id: current_chat }
    await sendSocketMessage("load_chat|||" + JSON.stringify(request));
}

async function sendChatMessage(chat_id, message) {
    let data = {
        chat_id: chat_id,
        message_uuid: Utils.generateUUID(),
        message_content: message
    }

    await sendSocketMessage(`send_chat_message|||${JSON.stringify(data)}`)
}

async function createChatElement(id, name, pending_messages) {
    let firstNameLetter = name[0];

    chatsContainer.insertAdjacentHTML('beforeend', `
        <button data-user-id="${id}" class="chat-button flex flex-row items-center hover:bg-indigo-100 active:bg-indigo-200 dark:hover:bg-indigo-500 dark:active:bg-indigo-600 rounded-xl p-2">
            <div class="flex items-center justify-center h-8 w-8 bg-indigo-400 text-white rounded-full">
            ${firstNameLetter}
            </div>
            <div class="ml-2 text-sm font-semibold">${name}
            </div> 
            ${pending_messages > 0 ? 
            `<div class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                ${pending_messages}
            </div>` : ''}
        </button>
    `);
}

async function createChatMessageElement(uuid, content) {
    chatMessages.insertAdjacentHTML('beforeend', `
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
    `);

    const newMessage = document.getElementById(uuid);
    newMessage.scrollIntoView();
}

document.addEventListener("DOMContentLoaded", init);