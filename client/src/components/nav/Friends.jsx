import { useEffect, useState } from "react";
import { isEmpty } from "../Utils";

export function Friend({ friendNav }) {
	const [friends, setFriends] = useState([]);
	const [readyFriend, setFriendReady] = useState(false);

	return (
		<div
			className={`flex flex-col my-4 flex-grow ${friendNav ? "" : "hidden"}`}>
			<div className="flex flex-row items-center justify-between text-xs">
				<span className="font-bold">My Friends ({friends.length})</span>
				<button className="flex items-center justify-center text-gray-500 dark:hover:text-gray-300 hover:text-black rounded-xl flex-shrink-0">
					<svg
						className="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6Zm1 8c0-2.66 5.33-4 8-4s8 1.34 8 4v2H7v-2Z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>

			<div
				className="flex flex-col space-y-1 mt-4 -mx-2 h-[22rem] overflow-y-auto"
				id="chats-container">
				{readyFriend ? (
					!isEmpty(friends) &&
					friends.map((friend) => (
						<button
							key={friend.chat_id}
							data-user-id={friend.chat_id}
							className="chat-button flex flex-row items-center hover:bg-primary active:bg-primary dark:hover:bg-primary dark:active:bg-primary rounded-xl p-2">
							<div className="flex items-center justify-center h-8 w-8 bg-primary text-white rounded-full">
								{friend.chat_name[0]}
							</div>
							<div className="ml-2 text-sm font-semibold select-none">
								{friend.chat_name}
							</div>
						</button>
					))
				) : (
					<>
						<div className="animate-pulse flex space-x-4 items-center p-2">
							<div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
							<div className="flex-1 space-y-6 py-1">
								<div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
							</div>
						</div>

						<div className="animate-pulse flex space-x-4 items-center p-2">
							<div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
							<div className="flex-1 space-y-6 py-1">
								<div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
							</div>
						</div>

						<div className="animate-pulse flex space-x-4 items-center p-2">
							<div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
							<div className="flex-1 space-y-6 py-1">
								<div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
							</div>
						</div>

						<div className="animate-pulse flex space-x-4 items-center p-2">
							<div className="rounded-full bg-slate-600 dark:bg-slate-400 h-10 w-10"></div>
							<div className="flex-1 space-y-6 py-1">
								<div className="h-2 bg-slate-600 dark:bg-slate-400 rounded"></div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
