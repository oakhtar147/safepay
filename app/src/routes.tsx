import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import App from "./App";
import StudentsPage from "./pages/Students";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<StudentsPage />} />
		</Route>
	)
);

export default function RoutesProvider() {
	return <RouterProvider router={router} />;
}
