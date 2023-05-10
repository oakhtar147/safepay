import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Header from "./components/Header";
import { device } from "./helpers/css";

const AppContainer = styled.div`
	padding: 1rem 1rem;

	@media ${device.tablet} {
		padding: 1rem 8rem;
	}

	@media ${device.laptop} {
		padding: 1rem 18rem;
	}

	@media ${device.laptopL} {
		padding: 1rem 24rem;
	}
`;

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			<AppContainer>
				<Outlet />
			</AppContainer>
		</QueryClientProvider>
	);
}
