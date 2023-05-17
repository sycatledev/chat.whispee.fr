import React from "react";
import planeImg from "../../assets/indigo-plane-196.png";

export default function HomeContainer({ username, handleSidebarToggle }) {
	return (
		<div className="bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white rounded-t-xl">
			<div
				id="chat-header"
				className="flex flex-row items-center h-16 rounded-t-xl bg-[#f7f7f7] dark:bg-[#1c1c1c] text-black dark:text-white duration-200 w-full px-2 shadow-sm border-b border-neutral-200 dark:border-neutral-700">
				<button
					onClick={handleSidebarToggle}
					className="flex items-center justify-center text-gray-500 dark:hover:text-gray-300 hover:text-black rounded-xl mr-1 lg:mr-2">
					<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
						<path d="M3 18h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18V6H3Z"></path>
					</svg>
				</button>

				<div className="flex flex-row items-center relative justify-center w-full">
					<div className="text-sm font-semibold select-none">Home</div>
				</div>
			</div>
			<div
				id="chat-content"
				className="flex flex-col h-full overflow-x-auto p-4">
				<div className="flex h-full my-auto rounded-2xl">
					<div className="flex flex-col items-center text-center m-auto space-y-4">
						<img className="w-auto object-cover" src={planeImg} alt="" />
						<h1 className="text-3xl font-semibold">
							Welcome back {username}. 😄
						</h1>
						<p className="text-gray-400 text-sm">
							Select a conversation from your contacts list and start chatting
							in <span className="text-primary">private</span>.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
