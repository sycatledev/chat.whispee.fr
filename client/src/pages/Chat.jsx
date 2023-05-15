import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../components/Utils.jsx";
import * as Cookies from "../utils/cookies.js";
import ChatContainer from "../components/chats/ChatContainer.jsx";
import HomeContainer from "../components/chats/HomeContainer.jsx";

import Modal from "../components/modals/Modal.jsx";
import Sidebar from "../components/Sidebar.jsx";

function ProfilModal({ isOpen, onClose }) {
	return (
		<Modal title="Profil" isOpen={isOpen} onClose={onClose}>
			<p>Ceci est le contenu?</p>
		</Modal>
	);
}

export default function Chat() {
	const {
		chat,
		chats,
		ready,
		singleChat,
		deleted,
		deletedMessage,
		username,
		userId,
		currentChat,
		setCurrentChat,
		messages,
		setReadyMessages,
		readyMessages,
		setMessages,
		webSocket,
		sendSocketMessage,
		session,
		newMessage,
		setNewMessage,
		handleDisconnect,
	} = useAppData();

	const [isDark, setIsDark] = useState(false);
	const [messageNav, setMessageNav] = useState(true);
	const [friendNav, setFriendNav] = useState(false);
	const [showProfil, setShowProfil] = useState(false);
	const [sidebarToggled, toggleSidebar] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const prefersDarkMode = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		const cookieTheme = Cookies.cookieManager.getCookie("theme");
		setIsDark(cookieTheme === "dark" || prefersDarkMode);
		toggleSidebar(window.innerWidth >= 720);
	}, []);

	function toggleTheme() {
		setIsDark((prevIsDark) => !prevIsDark);
	}

	useEffect(() => {
		setTheme(isDark);
	}, [isDark]);

	useEffect(() => {
		if (session === false) {
			navigate("/");
		}
	}, [session]);

	function setTheme(dark) {
		const root = document.documentElement;
		if (dark) {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
		Cookies.cookieManager.setCookie("theme", dark ? "dark" : "light");
	}
	let displayChat = async (id) => {
		await loadChat(id);
	};

	let loadChat = async (chat_id) => {
		if (currentChat === chat_id) return;
		if (chat_id === null) return;
		setCurrentChat(chat_id);
		let request = { chat_id: chat_id };
		await sendSocketMessage(
			webSocket,
			"load_chat|||" + JSON.stringify(request)
		);
	};

	let deleteChatMessage = async (message_id) => {
		let data = {
			message_id,
		};
		await sendSocketMessage(
			webSocket,
			`delete_chat_message|||${JSON.stringify(data)}`
		);
	};
	let handleCloseProfil = () => {
		setShowProfil(false);
	};
	let handleSidebarToggle = () => {
		toggleSidebar(!sidebarToggled);
	};

	useEffect(() => {
		if (ready && chat) {
			document.title = chat.chat_name + " | Whispee Chat";
		} else {
			document.title = "Whispee Chat";
		}
	}, [chat]);

	return (
		<div
			className={`bg-[#fefefe] dark:bg-[#080808] text-black dark:text-white duration-200 overflow-x-hidden`}>
			{showProfil ? (
				<ProfilModal
					title="Profil"
					isOpen={showProfil}
					onClose={handleCloseProfil}
				/>
			) : (
				""
			)}

			<div className="flex h-screen antialiased text-gray-800">
				<div className="flex flex-row h-full w-full overflow-x-hidden duration-200">
					<Sidebar
						visible={sidebarToggled}
						messageNav={messageNav}
						setMessageNav={setMessageNav}
						friendNav={friendNav}
						setFriendNav={setFriendNav}
						chats={chats}
						ready={ready}
						displayChat={displayChat}
						messages={messages}
						toggleTheme={toggleTheme}
						username={username}
						handleDisconnect={handleDisconnect}
					/>
					<div className="flex flex-col flex-auto h-full p-2 lg:p-4 duration-200">
						<div
							id="chat-wrapper"
							className="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full bg-[#f7f7f7] dark:bg-[#1c1c1c]">
							{singleChat ? (
								<ChatContainer
									handleSidebarToggle={handleSidebarToggle}
									ready={ready}
									chat={chat}
									currentChat={currentChat}
									messages={messages}
									deletedMessage={deletedMessage}
									deleted={deleted}
									deleteChatMessage={deleteChatMessage}
									setMessages={setMessages}
									setReadyMessages={setReadyMessages}
									readyMessages={readyMessages}
									newMessage={newMessage}
									userId={userId}
									username={username}
									setNewMessage={setNewMessage}
								/>
							) : (
								<HomeContainer
									username={username}
									handleSidebarToggle={handleSidebarToggle}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
