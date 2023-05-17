import React, { useState } from "react";

const Nav = ({
	toggle,
	messageNav,
	setMessageNav,
	friendsNav,
	setFriendNav,
	settingsNav,
	setSettingsNav,
}) => {
	const handleNav = (e) => {
		let parent = e.target;
		for (let i = 0; i < 5; i++) {
			if (parent.id === "messageNav") {
				setFriendNav(false);
				setSettingsNav(false);

				setMessageNav(true);
				break;
			} else if (parent.id === "friendNav") {
				setMessageNav(false);
				setSettingsNav(false);

				setFriendNav(true);
				break;
			} else if (parent.id === "settingsNav") {
				setMessageNav(false);
				setFriendNav(false);

				setSettingsNav(true);
				break;
			} else {
				parent = parent.parentNode;
			}
		}
	};
	return (
		<div
			className="flex flex-row items-center text-black dark:text-white w-full justify-around p-1.5 border-t-[1px] lg:border-t-0 lg:border-b-[1px] border-neutral-200 dark:border-neutral-600"
			onClick={handleNav}>
			<button
				className={`p-2 rounded-xl ${
					messageNav
						? "dark:text-white text-black"
						: "text-gray-500 dark:hover:text-gray-300 hover:text-black"
				}`}
				id="messageNav">
				<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M4 18h2v4.081L11.101 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2Z"></path>
					<path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2Z"></path>
				</svg>
			</button>

			<button
				className={`p-2 rounded-xl ${
					friendsNav
						? "dark:text-white text-black"
						: "text-gray-500 dark:hover:text-gray-300 hover:text-black"
				}`}
				id="friendNav">
				<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M21 2H6a2 2 0 0 0-2 2v3H2v2h2v2H2v2h2v2H2v2h2v3a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-8 2.999c1.648 0 3 1.351 3 3A3.012 3.012 0 0 1 13 11c-1.647 0-3-1.353-3-3.001 0-1.649 1.353-3 3-3ZM19 18H7v-.75c0-2.219 2.705-4.5 6-4.5s6 2.281 6 4.5V18Z"></path>
				</svg>
			</button>

			<button
				className={`p-2 rounded-xl ${
					friendsNav
						? "dark:text-white text-black"
						: "text-gray-500 dark:hover:text-gray-300 hover:text-black"
				}`}
				id="settingsNav">
				<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4Zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2Z"></path>
					<path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.723 7.723 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.101 8.101 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733Zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.072 6.072 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108Z"></path>
				</svg>
			</button>
		</div>
	);
};

export default Nav;
