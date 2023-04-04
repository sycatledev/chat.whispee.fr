
async function init() {
    websocket = new WebSocket("ws://localhost:456/");

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
}

async function handleSocketMessage(socketMessage) {
    console.log(">> " + socketMessage)
    let socketContent = socketMessage.split('|||');
    let socketCommand = socketContent[0];
    let socketData = socketContent[1];

    if (socketCommand === 'chat_message_sended') {
        let messageData = JSON.parse(socketData);

        createChatMessageElement(messageData.message_uuid, messageData.message_content)
    }
    else if (socketCommand === "loaded_chats") {
        let chatsData = JSON.parse(socketData);

        chatsContainer = document.getElementById("chats-container");
        chatsContainer.innerHTML = ``;

        for (let index in chatsData) {
            let chat = chatsData[index];
            createChatListElement(chat.chat_id, chat.chat_name, chat.chat_pending_messages)
        }

        let chatsElements = document.querySelectorAll('.chat-button');

        chatsElements.forEach(function (button) {
            button.addEventListener('click', async () => {
                const userId = button.getAttribute('data-user-id');

                await loadChat(userId);
            });
        });

        let chatsNumber = document.getElementById('active-chats-numbers');
        chatsNumber.innerText = chatsElements.length;
    }
    else if (socketCommand === 'chat_loaded') {
        let chat_data = JSON.parse(socketData);

        await updateChatElement(chat_data)
    }
}
async function sendSocketMessage(message) {
    console.log("<< " + message)

    websocket.send(message)
}

async function loadChat(chat_id) {
    if (current_chat === chat_id) return;

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

export default {
    init,
    handleSocketMessage,
    sendSocketMessage,
    loadChat,
    sendChatMessage,
};