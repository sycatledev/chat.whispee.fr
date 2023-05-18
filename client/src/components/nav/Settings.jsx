import React, { useEffect } from "react";
// import Avatar from "../user/Avatar.jsx";

const Settings = ({ translate, settingsNav, setSettingsNav, toggleTheme }) => {
	useEffect(() => {}, []);

	return (
		<div
			className={`flex flex-col my-4 flex-grow ${
				!settingsNav ? "hidden" : ""
			}`}>
			<div className="flex flex-row items-center justify-between text-xs">
				<span className="font-bold">{translate("settings")}</span>
			</div>
			<div
				className="flex flex-col h-full space-y-1 mt-4 -mx-2 overflow-y-auto"
				id="chats-container">
				<button
					id="theme-button"
					onClick={toggleTheme}
					className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 dark:active:bg-primary active:bg-primary p-2 rounded-xl">
					<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M19.072 19.072c3.832-3.833 3.832-10.31 0-14.143-3.833-3.833-10.31-3.833-14.144 0-3.833 3.833-3.833 10.31 0 14.143s10.31 3.833 14.143 0ZM7.052 7.052c2.705-2.707 7.19-2.708 9.898 0l-9.9 9.898c-2.708-2.707-2.71-7.19 0-9.898Z"></path>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Settings;
