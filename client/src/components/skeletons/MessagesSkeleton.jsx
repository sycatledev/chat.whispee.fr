import React from "react";
import Loader from "../Loader.jsx";

export default function MessagesSkeleton() {
	return (
		<div className="col-span-12 row-span-full justify-center items-center content-center h-full w-full m-auto">
			<Loader size="12"></Loader>
		</div>
	);
}
