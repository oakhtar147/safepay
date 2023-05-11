import { Text, Title } from "@mantine/core";

import { useAddStudent, useGetAllStudents } from "../api/students";
import { ServerError } from "../components/ErrorBoundary";
import StudentForm from "../components/StudentForm";
import StudentsTable from "../components/StudentTable";
import { brandColors } from "../helpers/css";

export default function StudentsPage() {
	const allStudentsQuery = useGetAllStudents();
	const addStudent = useAddStudent();

	return (
		<div>
			<StudentsTable
				data={allStudentsQuery.data ?? []}
				isLoading={allStudentsQuery.isLoading}
				isError={allStudentsQuery.isError}
				errorElement={<ServerError />}
			/>
			<Title order={3} mt="lg" mb="xs" color={brandColors.primary.blue}>
				Add new student
			</Title>
			<Text mb="lg" color="dimmed">
				Fill out the form to add a new student.
			</Text>
			<StudentForm
				isLoading={addStudent.isLoading}
				onSubmit={(values, form) =>
					addStudent.mutate(
						{
							name: values.name,
							age: +values.age,
							class: +values.class,
							gpa: +values.gpa,
							sex: values.sex,
							siblings: +values.siblings,
						},
						{ onSuccess: form.reset }
					)
				}
			/>
		</div>
	);
}
