import { Flex, Text, Title } from "@mantine/core";
import { IconError404, IconMoodSad, IconMoodSad2 } from "@tabler/icons-react";
import { brandColors } from "../helpers/css";
import { HEADER_HEIGHT } from "./Header";

export function ErrorBoundary() {
	return (
		<Flex direction="column" align="center" justify="center" h="100vh">
			<IconMoodSad2 size={64} color={brandColors.primary.blue} />
			<Title order={3} color={brandColors.primary.blue}>
				An error occurred. Please refresh the page and try again.
			</Title>
		</Flex>
	);
}

export function NotFound() {
	return (
		<Flex
			direction="column"
			align="center"
			justify="center"
			h={`calc(100vh - ${HEADER_HEIGHT})`}
		>
			<IconError404 size={64} color={brandColors.primary.blue} />
			<Title order={3} color={brandColors.primary.blue}>
				Page Not Found
			</Title>
		</Flex>
	);
}

export function ServerError({
	message = "Internal Server Error",
}: {
	message?: string;
}) {
	return (
		<Flex align="center" gap="xs">
			<IconMoodSad color="red" />
			<Text color="red">{message}</Text>
		</Flex>
	);
}
