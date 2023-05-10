import { ActionIcon, Group, Text, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useCallback, useMemo } from "react";
import { styled } from "styled-components";
import {
	useAddStudent,
	useDeleteStudent,
	useGetAllStudents,
} from "../api/students";
import { Student } from "../api/students.types";
import StudentForm from "../components/StudentForm";
import StudentModal, { useStudentModal } from "../components/StudentModal";
import capitalizeString from "../helpers/capitalize";

export default function StudentsPage() {
	const { mutate, isLoading } = useAddStudent();

	return (
		<div>
			<Title my="md">Students</Title>
			<StudentsTable />
			<Title order={3} mt="lg" mb="xs">
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

function DeleteStudentButton({ studentId }: { studentId: number }) {
	const { mutate, isLoading } = useDeleteStudent();

	const deleteStudent = useCallback(
		() => mutate(studentId),
		[studentId, mutate]
	);

	return (
		<ActionIcon color="red" loading={isLoading}>
			<IconTrash size={16} onClick={deleteStudent} />
		</ActionIcon>
	);
}

function StudentsTable() {
	const { data = [], isLoading } = useGetAllStudents();
	const { opened, studentId, handleOpenModal, handleCloseModal } =
		useStudentModal();

	const COLUMNS: DataTableColumn<Student>[] = useMemo(
		() => [
			{ accessor: "uuid", title: "#" },
			{ accessor: "name", title: "Name" },
			{ accessor: "age", title: "Age" },
			{ accessor: "siblings", title: "# Siblings" },
			{
				accessor: "sex",
				title: "Sex",
				render: ({ sex }) => <Text>{capitalizeString(sex)}</Text>,
			},
			{ accessor: "class", title: "Class" },
			{ accessor: "gpa", title: "GPA", render: ({ gpa }) => gpa.toFixed(2) },
			{
				accessor: "actions",
				textAlignment: "right",
				title: <Text mr="xs">Actions</Text>,
				render: ({ uuid }) => (
					<Group spacing={4} position="right" noWrap>
						<ActionIcon color="blue">
							<IconEdit size={16} onClick={() => handleOpenModal(uuid)} />
						</ActionIcon>
						<DeleteStudentButton studentId={uuid} />
					</Group>
				),
			},
		],
		[handleOpenModal]
	);

	return (
		<>
			<HeightConstrainedContainer>
				<DataTable
					withBorder
					borderRadius="sm"
					records={data}
					fetching={isLoading}
					minHeight="100px"
					columns={COLUMNS}
				/>
			</HeightConstrainedContainer>
			<StudentModal
				studentId={studentId}
				opened={opened}
				onClose={handleCloseModal}
			/>
		</>
	);
}

const HeightConstrainedContainer = styled.div`
	max-height: calc(100vh - 500px);
`;
