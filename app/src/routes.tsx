import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import App from "./App";
import { ErrorBoundary, NotFound } from "./components/ErrorBoundary";
import LookupPage from "./pages/Lookup";
import StudentsPage from "./pages/Students";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
			<Route path="/" element={<StudentsPage />} />
			<Route path="/lookup" element={<LookupPage />} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

export default function RoutesProvider() {
	return <RouterProvider router={router} />;
}
