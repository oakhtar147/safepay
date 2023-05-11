import { useOutletContext } from "react-router-dom";

export default function useLookup() {
	return useOutletContext() satisfies [
		string,
		React.Dispatch<React.SetStateAction<string>>
	];
}
