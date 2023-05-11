export default function isStringNumeric(str: string) {
	return /^[0-9]*$/.test(str);
}
