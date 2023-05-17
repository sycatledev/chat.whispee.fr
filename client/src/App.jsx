import { useState, useRef } from "react";
import Authentification from "./pages/Authentification.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat.jsx";
import { useEffect } from "react";

export default function App() {
	const [webSocket, setWebSocket] = useState(null);
	const [pending, setPending] = useState(true);
	const currentChatRef = useRef(null);
	const [messages, setMessages] = useState([]);
	const [chats, setChats] = useState([]);
	const [chat, setChat] = useState(null);
	const [singleChat, setSingleChat] = useState(false);
	const [ready, setReady] = useState(false);
	const [readyMessages, setReadyMessages] = useState(false);
	const [messageIds, setMessageIds] = useState([]);
	const [deletedMessage, setDeletedMessage] = useState(null);
	const [session, setSession] = useState(null);
	const [connectedUser, setConnectedUser] = useState(false);
	const [identify, setIdentify] = useState(false);
	const [login, setLogin] = useState(false);
	const [register, setRegister] = useState(false);
	const [friends, setFriends] = useState([]);
	const [friendReady, setFriendReady] = useState(false);
	const [currentChat, setCurrentChat] = useState(null);
	const [deleted, setDeleted] = useState(null);
	const [username, setUsername] = useState("");
	const [userId, setUserId] = useState(null);
	const [newMessage, setNewMessage] = useState(null);

	useEffect(() => {
		const init = async () => {
			const ws = new WebSocket("ws://localhost:456/");
			ws.addEventListener("open", async (event) => {
				console.count("Connected to server");

				const sessionId = window.localStorage.getItem("session_id");
				let sessionData = {
					session_id: sessionId,
				};

				await sendSocketMessage(
					ws,
					JSON.stringify({
						command: "check_session",
						data: sessionData,
					})
				);

				if (currentChat != null) {
					let request = { chat_id: currentChat };
					await sendSocketMessage(
						ws,
						JSON.stringify({
							command: "load_chat",
							data: request,
						})
					);
				}
				if (sessionId != null) {
					await sendSocketMessage(
						ws,
						JSON.stringify({
							command: "load_chats",
							data: {},
						})
					);
				}
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
			setWebSocket(ws);
		};
		init();
	}, []);
	if (currentChatRef.current !== currentChat) {
		/* setMessages([]); */
		setCurrentChat(currentChat);
		currentChatRef.current = currentChat;
	}
	const sendSocketMessage = async (webSocket, message) => {
		console.log("<< " + message);

		webSocket.send(message);
	};
	const handleSocketMessage = async (socketMessage) => {
		console.log(">> " + socketMessage);

		let socketContent = JSON.parse(socketMessage);
		let socketCommand = socketContent.command;
		let socketData = socketContent.data;

		if (socketCommand === "active_session") {
			setUserId(socketData.user.id);
			setUsername(socketData.user.username);
			setSession(true);
			setPending(false);
		} else if (socketCommand === "session_inactive") {
			window.localStorage.setItem("session_id", "");

			setSession(false);
			setPending(false);
		} else if (socketCommand === "no_identifier_found") {
			// User not exist in database
			setIdentify(true);
			setRegister(true); // Redirect to register page
		} else if (socketCommand === "identifier_found") {
			setUsername(socketData.username);
			setIdentify(true);
			setLogin(true);
		} else if (socketCommand === "login_succeeded") {
			window.localStorage.setItem("session_id", socketData["session_id"]);
			setConnectedUser(true);
		} else if (socketCommand === "register_succeeded") {
			window.localStorage.setItem("session_id", socketData["session_id"]);
			setConnectedUser(true);
		} else if (socketCommand === "user_disconnected") {
			window.localStorage.setItem("session_id", "");

			setConnectedUser(false);
			setSession(false);
			setPending(false);
		} else if (socketCommand === "chat_message_sended") {
			setNewMessage(socketData);
			setMessages((messages) => [...messages, socketData]);
		} else if (socketCommand === "chats_loaded") {
			setChats(socketData);
			setReady(true);
			setReadyMessages(true);
		} else if (socketCommand === "chat_loaded") {
			setChat(socketData);
			setSingleChat(true);
		} else if (socketCommand === "chat_messages_loaded") {
			console.log(socketData);
			setMessages(socketData);
			console.log("message depuis app.jsx", messages);
		} else if (socketCommand === "chat_message_deleted") {
			setReadyMessages(false);
			setDeletedMessage(socketData);
			setDeleted(true);
			setReadyMessages(true);
		} else if (socketCommand === "friends_loaded") {
			setFriends(socketData);
			setFriendReady(true);
		}
	};
	let sendChatMessage = async (chat_id, message) => {
		let data = {
			chat_id: chat_id,
			content: message,
		};

		await sendSocketMessage(
			webSocket,
			JSON.stringify({
				command: "send_chat_message",
				data,
			})
		);
	};

	const handleDisconnect = async () => {
		if (webSocket == null) return;
		if (session == null) return;

		await sendSocketMessage(
			webSocket,
			JSON.stringify({
				command: "disconnect",
				data: {},
			})
		);
	};
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<Authentification
								identify={identify}
								webSocket={webSocket}
								register={register}
								username={username}
								login={login}
								session={session}
								sendSocketMessage={sendSocketMessage}
								setLogin={setLogin}
								setRegister={setRegister}
								setIdentify={setIdentify}
								handleSocketMessage={handleSocketMessage}
								connectedUser={connectedUser}
							/>
						}
					/>
					<Route
						path="/app"
						element={
							<Chat
								chat={chat}
								chats={chats}
								ready={ready}
								singleChat={singleChat}
								deletedMessage={deletedMessage}
								username={username}
								userId={userId}
								currentChat={currentChat}
								setCurrentChat={setCurrentChat}
								messages={messages}
								setReadyMessages={setReadyMessages}
								readyMessages={readyMessages}
								setMessages={setMessages}
								sendSocketMessage={sendSocketMessage}
								session={session}
								newMessage={newMessage}
								setNewMessage={setNewMessage}
								webSocket={webSocket}
								handleDisconnect={handleDisconnect}
								sendChatMessage={sendChatMessage}
								connectedUser={connectedUser}
								deleted={deleted}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
