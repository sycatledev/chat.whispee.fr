export default function formatTimestampToTimeDifference(
	timestamp,
	details,
	translate
) {
	const timeMls = new Date(timestamp * 1000);
	const timeDifference = new Date() - timeMls;
	const secondsDifference = Math.floor(timeDifference / 1000);
	const minutesDifference = Math.floor(timeDifference / (1000 * 60));
	const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
	const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	const weeksDifference = Math.floor(
		timeDifference / (1000 * 60 * 60 * 24 * 7)
	);
	const monthsDifference = Math.floor(
		timeDifference / (1000 * 60 * 60 * 24 * 30.44)
	);
	const yearsDifference = Math.floor(
		timeDifference / (1000 * 60 * 60 * 24 * 365.25)
	);

	let result = "";

	if (yearsDifference > 0) {
		result = `${yearsDifference} year${yearsDifference > 1 ? "s" : ""} ago`;
	} else if (monthsDifference > 0) {
		result = `${monthsDifference} month${monthsDifference > 1 ? "s" : ""} ago`;
	} else if (weeksDifference > 0) {
		result = `${weeksDifference} week${weeksDifference > 1 ? "s" : ""} ago`;
	} else if (daysDifference === 1) {
		result = `1 day ago`;
	} else if (daysDifference > 1) {
		result = `${daysDifference} days ago`;
	} else if (hoursDifference > 0) {
		result = `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
	} else if (minutesDifference > 0) {
		result = `${minutesDifference} minute${
			minutesDifference > 1 ? "s" : ""
		} ago`;
	} else if (secondsDifference >= 5) {
		result = `${secondsDifference} second${
			secondsDifference > 1 ? "s" : ""
		} ago`;
	} else {
		result = `just now`;
	}

	if (details) {
		if (secondsDifference >= 5) {
			const hour = timeMls.getHours();
			const minutes = timeMls.getMinutes();
			const ampm = hour >= 12 ? "PM" : "AM";
			const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
			result += `, ${formattedHour}:${
				minutes < 10 ? "0" + minutes : minutes
			}${ampm}`;
		}
	}

	return result;
}
