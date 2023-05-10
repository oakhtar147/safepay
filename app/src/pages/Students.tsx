import { useGetAllStudents } from "../api/students";

export default function StudentsPage() {
	const { data } = useGetAllStudents();

	return (
		<div>
			<h1>Students</h1>
		</div>
	);
}
