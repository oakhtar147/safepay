import { ActionIcon, Group, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { sortBy } from "lodash";
import {
	DataTable,
	DataTableColumn,
	DataTableSortStatus,
} from "mantine-datatable";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useDeleteStudent, useGetAllStudents } from "../api/students";
import { Student } from "../api/students.types";
import capitalizeString from "../helpers/capitalize";
import StudentModal, { useStudentModal } from "./StudentModal";

export default function StudentsTable() {
	const { data = [], isLoading } = useGetAllStudents();
	const { records, sortStatus, setSortStatus } = useSortedData(data);

	const { opened, studentId, handleOpenModal, handleCloseModal } =
		useStudentModal();

	const COLUMNS: DataTableColumn<Student>[] = useMemo(
		() => [
			{ accessor: "uuid", title: "ID" },
			{ accessor: "name", title: "Name", sortable: true },
			{ accessor: "age", title: "Age", sortable: true },
			{ accessor: "siblings", title: "# Siblings", sortable: true },
			{
				accessor: "sex",
				title: "Sex",
				render: ({ sex }) => <Text>{capitalizeString(sex)}</Text>,
			},
			{ accessor: "class", title: "Class", sortable: true },
			{
				accessor: "gpa",
				title: "GPA",
				render: ({ gpa }) => gpa.toFixed(2),
				sortable: true,
			},
			{
				accessor: "actions",
				textAlignment: "right",
				title: <Text mr="xs">Actions</Text>,
				render: ({ uuid }) => (
					<Group spacing={4} position="right" noWrap>
						<ActionIcon color="blue" onClick={() => handleOpenModal(uuid)}>
							<IconEdit size={16} />
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
					records={records}
					fetching={isLoading}
					minHeight="100px"
					columns={COLUMNS}
					sortStatus={sortStatus}
					onSortStatusChange={setSortStatus}
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

function DeleteStudentButton({ studentId }: { studentId: number }) {
	const { mutate, isLoading } = useDeleteStudent();

	const deleteStudent = useCallback(
		() => mutate(studentId),
		[studentId, mutate]
	);

	return (
		<ActionIcon color="red" onClick={deleteStudent} loading={isLoading}>
			<IconTrash size={16} />
		</ActionIcon>
	);
}

function useSortedData(data?: Array<Student>) {
	const [records, setRecords] = useState(sortBy(data, "name"));

	const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
		columnAccessor: "name" satisfies keyof Student,
		direction: "asc",
	});

	useEffect(() => {
		const sortedData = sortBy(data, sortStatus.columnAccessor);
		setRecords(
			sortStatus.direction === "desc" ? sortedData.reverse() : sortedData
		);
	}, [sortStatus, data]);

	return { records, sortStatus, setSortStatus };
}

const HeightConstrainedContainer = styled.div`
	max-height: calc(100vh - 500px);
`;
