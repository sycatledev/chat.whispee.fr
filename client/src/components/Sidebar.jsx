import Nav from "../components/Nav.jsx";
import Chats from "../components/nav/Chats.jsx";
import { Friend } from "../components/nav/Friends.jsx";
import Settings from "../components/nav/Settings.jsx";
import ProfilDropdown from "../components/Dropdown.jsx";
import { useEffect } from "react";

export default function Sidebar({
	session,
	webSocket,
	visible,
	messageNav,
	setMessageNav,
	friendNav,
	setFriendNav,
	settingsNav,
	setSettingsNav,
	chats,
	ready,
	displayChat,
	messages,
	toggle,
	username,
	handleDisconnect,
	currentChat,
	readyFriend,
	friends,
	sendSocketMessage,
}) {
	useEffect(() => {
		if (session) {
			sendSocketMessage(
				webSocket,
				JSON.stringify({
					command: "load_chats",
					data: {},
				})
			);

			sendSocketMessage(
				webSocket,
				JSON.stringify({
					command: "load_friends",
					data: {},
				})
			);
		}
	}, [session]);

	return (
		<div
			className={
				(visible ? "flex " : "hidden") +
				" p-4 w-64 text-black dark:text-white bg-[#f7f7f7] dark:bg-[#1c1c1c] h-full duration-200"
			}>
			<div className="flex flex-col-reverse lg:flex-col w-full h-full transition-all ease-out">
				<Nav
					messageNav={messageNav}
					setMessageNav={setMessageNav}
					friendNav={friendNav}
					setFriendNav={setFriendNav}
					settingsNav={settingsNav}
					setSettingsNav={setSettingsNav}
				/>
				<Chats
					chats={chats}
					ready={ready}
					displayChat={displayChat}
					messages={messages}
					messageNav={messageNav}
					currentChat={currentChat}
				/>
				<Friend
					friendNav={friendNav}
					readyFriend={readyFriend}
					friends={friends}
				/>
				<Settings settingsNav={settingsNav} toggleTheme={toggle} />

				<ProfilDropdown
					username={username}
					handleDisconnect={handleDisconnect}
				/>
			</div>
		</div>
	);
}
