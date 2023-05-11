import { Badge, Card, CardProps, Group, Text } from "@mantine/core";
import capitalize from "lodash/capitalize";
import { Student } from "../api/students.types";

export default function StudentCard({
	student,
	...props
}: Omit<CardProps, "children"> & { student: Student }) {
	return (
		<Card shadow="xs" padding="lg" radius="md" withBorder {...props}>
			<Group position="apart" mb="xs">
				<Text weight={500}>{student.name}</Text>
				<Badge color={student.sex === "male" ? "blue" : "pink"} variant="light">
					{capitalize(student.sex)}
				</Badge>
			</Group>
			<Text size="sm" color="dimmed">
				ID: {student.uuid}
			</Text>
			<Group position="left">
				<Text size="sm" color="dimmed">
					Class: {student.class}
				</Text>
				<Text size="sm" color="dimmed">
					GPA: {student.gpa}
				</Text>
			</Group>
			<Group position="left">
				<Text size="sm" color="dimmed">
					Age: {student.age}
				</Text>
				<Text size="sm" color="dimmed">
					# Siblings: {student.siblings}
				</Text>
			</Group>
		</Card>
	);
}
