import Avatar from "../user/Avatar.jsx";

export default function ChatHeader({ handleSidebarToggle, ready, chat }) {
	return (
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

			<div className="flex-grow cursor-pointer">
				<div className="flex flex-row items-center relative justify-center w-full">
					{ready ? (
						<>
							<Avatar username={chat?.chat_name}></Avatar>
							<div className="ml-2 text-sm font-semibold select-none">
								{chat?.chat_name}
							</div>
						</>
					) : (
						""
					)}
				</div>
			</div>

			<div className="flex items-center justify-center">
				<button className="flex items-center justify-center text-gray-500 dark:hover:text-gray-300 hover:text-black p-2 rounded-xl">
					<svg
						className="w-6 h-6"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							d="M18 11c1.66 0 2.99-1.34 2.99-3S19.66 5 18 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86 0 1.07-.34 2.04-.9 2.86.28.09.59.14.91.14ZM8 10H5V7H3v3H0v2h3v3h2v-3h3v-2Zm7.99-2c0 1.66-1.33 3-2.99 3-1.66 0-3-1.34-3-3s1.34-3 3-3 2.99 1.34 2.99 3Zm3.63 5.16c.83.73 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.37-2.49-4.38-2.84ZM7 16c0-2 4-3 6-3s6 1 6 3v2H7v-2Z"
							clipRule="evenodd"
						/>
					</svg>
				</button>

				<button className="flex items-center justify-center text-gray-500 dark:hover:text-gray-300 hover:text-black p-2 rounded-xl">
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"></path>
					</svg>
				</button>
			</div>
		</div>
	);
}
