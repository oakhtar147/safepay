import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RoutesProvider from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RoutesProvider />
	</React.StrictMode>
);
