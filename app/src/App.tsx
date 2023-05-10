import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Header from "./components/Header";

const AppContainer = styled.div`
	padding: 1rem 8rem;
`;

export default function App() {
	return (
		<>
			<Header />
			<AppContainer>
				<Outlet />
			</AppContainer>
		</>
	);
}
