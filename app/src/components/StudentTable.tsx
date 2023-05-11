import { ActionIcon, Flex, Group, Text, TextInput, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
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
import { brandColors } from "../helpers/css";
import StudentModal, { useStudentModal } from "./StudentModal";

export default function StudentsTable() {
	const { data = [], isLoading } = useGetAllStudents();
	const { records, query, handleQueryChange, sortStatus, setSortStatus } =
		useRecords(data);

	const { opened, studentId, handleOpenModal, handleCloseModal } =
		useStudentModal();

	const COLUMNS: DataTableColumn<Student>[] = useMemo(
		() => [
			{ accessor: "uuid", title: "ID", sortable: true },
			{ accessor: "name", title: "Name", sortable: true },
			{ accessor: "age", title: "Age", sortable: true },
			{ accessor: "siblings", title: "# Siblings", sortable: true },
			{
				accessor: "sex",
				title: "Sex",
				sortable: true,
				render: ({ sex, uuid }) => (
					<Text key={uuid}>{capitalizeString(sex)}</Text>
				),
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
			<Flex justify="space-between" align="center">
				<Title mah="2.25rem" my="md" color={brandColors.primary.blue}>
					Students
				</Title>
				<TextInput
					icon={<IconSearch />}
					placeholder="Search by name"
					value={query}
					onChange={handleQueryChange}
				/>
			</Flex>
			<HeightConstrainedContainer>
				<DataTable
					withBorder
					borderRadius="sm"
					records={records}
					idAccessor="uuid"
					fetching={isLoading}
					minHeight={!records.length ? 150 : undefined}
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

function useRecords(data: Array<Student> = []) {
	const [records, setRecords] = useState(sortBy(data, "name"));
	const [query, setQuery] = useState("");
	const [debouncedQuery] = useDebouncedValue(query, 200);

	const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
		columnAccessor: "name" satisfies keyof Student,
		direction: "asc",
	});

	const handleQueryChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) =>
			setQuery(event.target.value),
		[]
	);

	useEffect(() => {
		if (!debouncedQuery) setRecords(data);

		const filtered = data.filter(({ name }) => {
			const searchString = debouncedQuery.trim().toLowerCase();
			return name.toLowerCase().includes(searchString);
		});

		setRecords(filtered);
	}, [debouncedQuery, data]);

	useEffect(() => {
		const sortedData = sortBy(data, sortStatus.columnAccessor);
		setRecords(
			sortStatus.direction === "desc" ? sortedData.reverse() : sortedData
		);
	}, [sortStatus, data]);

	return { records, query, handleQueryChange, sortStatus, setSortStatus };
}

const HeightConstrainedContainer = styled.div`
	max-height: calc(100vh - 500px);
`;
