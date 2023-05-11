import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import App from "./App";
import LookupPage from "./pages/Lookup";
import StudentsPage from "./pages/Students";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<StudentsPage />} />
			<Route path="/about" element={<LookupPage />} />
		</Route>
	)
);

export default function RoutesProvider() {
	return <RouterProvider router={router} />;
}
