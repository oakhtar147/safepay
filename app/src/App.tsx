import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Header from "./components/Header";

const AppContainer = styled.div`
	padding: 1rem 8rem;
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
