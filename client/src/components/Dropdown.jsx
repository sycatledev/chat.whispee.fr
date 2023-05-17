import React, { useState, useEffect, useRef } from "react";
/* import { isEmpty } from "./Utils.jsx"; */
import Avatar from "./user/Avatar.jsx";

export default function ProfilDropdown({ username, toggle, handleDisconnect }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isUpwards, setIsUpwards] = useState(false);
	const ref = useRef(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	useEffect(() => {
		setIsUpwards(true);
	}, [isOpen]);

	return (
		<div
			ref={ref}
			className="flex flew-row relative justify-between items-center py-1.5 mt-auto border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-neutral-200 dark:border-neutral-600">
			<button
				className="flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-800 p-2 rounded-lg w-full"
				onClick={toggleDropdown}>
				<Avatar username={username}></Avatar>

				<span className="font-karla ml-2">{username}</span>

				<div className="flex ml-auto">
					<button
						id="theme-button"
						onClick={toggle}
						className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 dark:active:bg-primary active:bg-primary p-2 rounded-xl">
						<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M19.072 19.072c3.832-3.833 3.832-10.31 0-14.143-3.833-3.833-10.31-3.833-14.144 0-3.833 3.833-3.833 10.31 0 14.143s10.31 3.833 14.143 0ZM7.052 7.052c2.705-2.707 7.19-2.708 9.898 0l-9.9 9.898c-2.708-2.707-2.71-7.19 0-9.898Z"></path>
						</svg>
					</button>
				</div>
			</button>

			{isOpen ? (
				<div className="flex flex-col text-center translate-y-2 absolute bottom-full z-40 bg-slate-100 dark:bg-slate-600 shadow-lg py-0.5 rounded-lg w-48">
					<button
						className="flex p-2 font-semibold bg-slate-100 dark:bg-slate-600 text-red-500 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white rounded duration-200"
						onClick={handleDisconnect}>
						<span className="mx-auto">Disconnect</span>
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
}
