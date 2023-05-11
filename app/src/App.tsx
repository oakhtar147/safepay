import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Header from "./components/Header";
import { brandColors, device } from "./helpers/css";
import StoreProvider from "./store";

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

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: false }, // For the sake of this assignment, we do not want to retry failing queries.
	},
});

const theme: MantineThemeOverride = {
	components: {
		Button: {
			styles: {
				root: {
					backgroundColor: brandColors.primary.green,
					":hover": {
						backgroundColor: brandColors.primary.green,
						filter: "brightness(0.95)",
					},
				},
			},
		},
	},
};

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
				<Header />
				<AppContainer>
					<StoreProvider>
						<Outlet />
					</StoreProvider>
				</AppContainer>
			</MantineProvider>
		</QueryClientProvider>
	);
}
