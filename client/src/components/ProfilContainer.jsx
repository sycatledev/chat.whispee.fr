import { isEmpty } from "./Utils.jsx";
import Avatar from "./user/Avatar.jsx";

export default function ProfilContainer({
	toggle,
	showProfil,
	setShowProfil,
	username,
}) {
	return (
		<>
			<div className="flex justify-between items-center mt-5 pt-5 border-t-[1px] border-neutral-200 dark:border-neutral-600">
				<Tooltip
					content="Click here to access your profile"
					animation="duration-200">
					<ProfilDropdown />

					<button
						className="flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-800 p-2 rounded-lg"
						onClick={() =>
							showProfil ? setShowProfil(false) : setShowProfil(true)
						}>
						<Avatar username={username}></Avatar>

						<h1 className="font-karla ml-2">
							{!isEmpty(username) && username ? username : ""}
						</h1>
					</button>
				</Tooltip>
				<div className="flex">
					<button
						id="theme-button"
						onClick={toggle}
						className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 dark:active:bg-primary active:bg-primary p-2 rounded-xl">
						<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M19.072 19.072c3.832-3.833 3.832-10.31 0-14.143-3.833-3.833-10.31-3.833-14.144 0-3.833 3.833-3.833 10.31 0 14.143s10.31 3.833 14.143 0ZM7.052 7.052c2.705-2.707 7.19-2.708 9.898 0l-9.9 9.898c-2.708-2.707-2.71-7.19 0-9.898Z"></path>
						</svg>
					</button>
				</div>
			</div>
		</>
	);
}
