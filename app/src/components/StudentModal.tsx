import { Flex, Loader, Modal, ModalProps, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useRef } from "react";
import { useEditStudentDetails, useGetStudentDetails } from "../api/students";
import StudentForm from "./StudentForm";

type StudentModalProps = ModalProps & { studentId?: number };

export default function StudentModal({
	opened,
	onClose,
	studentId,
}: StudentModalProps) {
	const { data, isLoading } = useGetStudentDetails(studentId);
	const { mutate, isLoading: isEditing } = useEditStudentDetails();

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			centered
			title={<Title order={4}>Edit Student Details</Title>}
			size="xl"
			styles={{ inner: { paddingLeft: "0!important" } }}
		>
			{!data || isLoading ? (
				<Flex justify="center">
					<Loader />
				</Flex>
			) : (
				<StudentForm
					loading={isEditing}
					onSubmit={(values) => {
						if (!studentId) return;
						mutate(
							{
								uuid: studentId,
								name: values.name,
								age: +values.age,
								class: +values.class,
								gpa: +values.gpa,
								sex: values.sex,
								siblings: +values.siblings,
							},
							{ onSuccess: onClose }
						);
					}}
					initialValues={{
						age: data.age.toString(),
						class: data.class.toString(),
						gpa: data.gpa.toString(),
						name: data.name,
						siblings: data.siblings.toString(),
						sex: data.sex,
					}}
				/>
			)}
		</Modal>
	);
}

export function useStudentModal() {
	const [opened, { open, close }] = useDisclosure(false);
	const studentIdRef = useRef<number>();

	const handleOpenModal = useCallback(
		(studentId: number) => {
			studentIdRef.current = studentId;
			open();
		},
		[open]
	);

	const handleCloseModal = useCallback(() => {
		studentIdRef.current = undefined;
		close();
	}, [close]);

	return {
		studentId: studentIdRef.current,
		opened,
		handleOpenModal,
		handleCloseModal,
	};
}
