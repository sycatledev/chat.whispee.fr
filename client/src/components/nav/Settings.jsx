import React, { useEffect } from "react";
// import Avatar from "../user/Avatar.jsx";

const Settings = ({ settingsNav, setSettingsNav }) => {
	useEffect(() => {}, []);

	return (
		<div
			className={`flex flex-col my-4 flex-grow ${
				!settingsNav ? "hidden" : ""
			}`}>
			<div className="flex flex-row items-center justify-between text-xs">
				<span className="font-bold">My Settings</span>
			</div>
			<div
				className="flex flex-col h-full space-y-1 mt-4 -mx-2 overflow-y-auto"
				id="chats-container"></div>
		</div>
	);
};

export default Settings;
