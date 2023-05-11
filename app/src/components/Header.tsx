import { Anchor, Flex } from "@mantine/core";
import {
	Link,
	NavLinkProps,
	NavLink as ReactRouterNavLink,
} from "react-router-dom";
import { styled } from "styled-components";
import SafePayLogo from "../assets/SafePay_Logo.svg";
import { brandColors } from "../helpers/css";

const Div = styled.div`
	width: 120px;
`;

export default function Header() {
	return (
		<Flex justify="space-between" align="center" px="1rem" py="0.5rem">
			<Div>
				<Link to="/">
					<img src={SafePayLogo} />
				</Link>
			</Div>
			<Flex gap="md">
				<NavLink to="/">Student List</NavLink>
				<NavLink to="/about">Lookup Students</NavLink>
			</Flex>
		</Flex>
	);
}

function NavLink(props: Omit<NavLinkProps, "style">) {
	return (
		<Anchor
			{...props}
			color={brandColors.primary.blue}
			component={ReactRouterNavLink}
			style={({ isActive }) =>
				({
					fontWeight: isActive ? "bold" : "",
					textDecoration: isActive ? "underline" : "",
				} as any)
			}
		/>
	);
}
