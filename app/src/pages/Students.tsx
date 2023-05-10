import { Text, Title } from "@mantine/core";

import { useAddStudent } from "../api/students";
import StudentForm from "../components/StudentForm";
import StudentsTable from "../components/StudentTable";
import { brandColors } from "../helpers/css";

export default function StudentsPage() {
	const { mutate, isLoading } = useAddStudent();

	return (
		<div>
			<Title my="md" color={brandColors.primary.blue}>
				Students
			</Title>
			<StudentsTable />
			<Title order={3} mt="lg" mb="xs" color={brandColors.primary.blue}>
				Add new student
			</Title>
			<Text mb="lg" color="dimmed">
				Fill out the form to add a new student.
			</Text>
			<StudentForm
				loading={isLoading}
				onSubmit={(values, form) =>
					mutate(
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
