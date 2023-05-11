import { Flex } from "@mantine/core";
import { Link, NavLink as ReactRouterNavLink } from "react-router-dom";
import { styled } from "styled-components";
import SafePayLogo from "../assets/SafePay_Logo.svg";
import { brandColors } from "../helpers/css";

export const HEADER_HEIGHT = "80px";

const Div = styled.div`
	width: 120px;
`;

export default function Header() {
	return (
		<Flex
			mah={HEADER_HEIGHT}
			justify="space-between"
			align="center"
			px="1rem"
			py="0.5rem"
		>
			<Div>
				<Link to="/">
					<img src={SafePayLogo} />
				</Link>
			</Div>
			<Flex gap="md">
				<NavLink to="/">Student List</NavLink>
				<NavLink to="/lookup">Lookup Students</NavLink>
			</Flex>
		</Flex>
	);
}

const NavLink = styled(ReactRouterNavLink)`
	color: ${brandColors.primary.blue};
	text-decoration: none;
	&.active {
		font-weight: bold;
		text-decoration: underline;
	}
`;
