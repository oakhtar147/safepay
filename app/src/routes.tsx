import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import App from "./App";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<h1>Students</h1>} />
		</Route>
	)
);

export default function RoutesProvider() {
	return <RouterProvider router={router} />;
}
