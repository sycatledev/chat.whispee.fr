import React, { useState, useEffect, useRef } from "react";
import Avatar from "./user/Avatar.jsx";

export default function ProfilDropdown({
	translate,
	username,
	toggle,
	handleDisconnect,
}) {
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
				className="flex items-center hover:bg-neutral-200 justify-center dark:hover:bg-neutral-800 p-2 rounded-lg w-full"
				onClick={toggleDropdown}>
				<Avatar username={username}></Avatar>

				<span className="font-karla ml-2">{username}</span>
			</button>

			{isOpen ? (
				<div className="flex flex-col text-center translate-y-2 absolute bottom-full z-40 bg-slate-100 dark:bg-zinc-800 mx-auto shadow-lg py-0.5 rounded-lg w-48">
					<button
						className="flex p-2 font-semibold bg-slate-100 dark:bg-slate-600 text-red-500 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white rounded duration-200"
						onClick={handleDisconnect}>
						<span className="mx-auto">{translate("logout")}</span>
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
}
