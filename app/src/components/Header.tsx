import { Link } from "react-router-dom";
import { styled } from "styled-components";
import SafePayLogo from "../assets/SafePay_Logo.svg";

const Div = styled.div`
	width: 150px;
	padding: 0.5rem 1rem;
`;

export default function Header() {
	return (
		<Div>
			<Link to="/">
				<img src={SafePayLogo} />
			</Link>
		</Div>
	);
}
