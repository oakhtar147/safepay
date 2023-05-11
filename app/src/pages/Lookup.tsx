import { Button, Flex, Text, TextInput, Title } from "@mantine/core";
import { IconHourglassEmpty, IconSearch } from "@tabler/icons-react";
import { useCallback, useMemo } from "react";
import { useGetStudentDetails } from "../api/students";
import StudentCard from "../components/StudentCard";
import { brandColors } from "../helpers/css";
import isStringNumeric from "../helpers/isStringNumeric";
import useLookup from "../hooks/useLookup";

export default function LookupPage() {
	const [lookup, setLookup] = useLookup();

	const { data, isRefetching, refetch } = useGetStudentDetails(+lookup, false, [
		"lookup",
	]);

	const fetchStudent = useCallback(() => refetch(), [refetch]);
	const isValidInput = useMemo(() => isStringNumeric(lookup), [lookup]);

	return (
		<>
			<Title color={brandColors.primary.blue} mb="2rem">
				Student Lookup
			</Title>
			<Flex gap="1rem">
				<div>
					<TextInput
						withAsterisk
						label="Search"
						icon={<IconSearch />}
						placeholder="By Student ID"
						error={!isValidInput ? "Student ID must be a number" : undefined}
						value={lookup}
						onChange={(event) => setLookup(event.currentTarget.value)}
					/>
					<Button
						mt="xs"
						disabled={!isValidInput || isRefetching}
						loading={isRefetching}
						onClick={fetchStudent}
					>
						Search
					</Button>
				</div>

				{data ? (
					<StudentCard student={data} />
				) : (
					data === null && (
						<Flex align="center" gap="xs">
							<IconHourglassEmpty />
							<Text style={{ alignSelf: "center" }}>No record found</Text>
						</Flex>
					)
				)}
			</Flex>
		</>
	);
}
