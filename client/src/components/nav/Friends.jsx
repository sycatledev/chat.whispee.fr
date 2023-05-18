import Avatar from "../user/Avatar.jsx";

export function Friend({ translate, friendNav, friends, readyFriend }) {
	return (
		<div
			className={`flex flex-col my-4 flex-grow ${!friendNav ? "hidden" : ""}`}>
			<div className="flex flex-row items-center justify-between text-xs">
				<span className="font-bold">
					{translate("my_friends")} - {friends.length}
				</span>
				<button className="flex items-center justify-center text-gray-500 dark:hover:text-gray-300 hover:text-black rounded-xl flex-shrink-0">
					<svg
						className="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
					</svg>
				</button>
			</div>
			<div
				className="flex flex-col h-full space-y-1 mt-4 -mx-2 overflow-y-auto"
				id="chats-container">
				{readyFriend ? (
					friends.map((c) => (
						<button
							// onClick={() => displayChat(c.chat_id)}
							key={c.chat_id}
							className={
								"hover:bg-neutral-200 dark:hover:bg-neutral-900 font-normal chat-button flex flex-row items-center rounded-xl p-2 group space-x-2"
							}>
							<div className="items-center flex flex-row relative pl-2">
								<Avatar username={c.chat_name}></Avatar>
							</div>
							<div className="text-sm select-none">{c.chat_name}</div>
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
