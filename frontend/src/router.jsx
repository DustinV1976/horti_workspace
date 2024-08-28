import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./Pages/HomePage";
import NutrientsPage from "./Pages/NutrientsPage";
import MyGardenPage from "./Pages/MyGardenPage";
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import NotFoundPage from "./Pages/NotFoundPage";
// import ErrorPage from "./Pages/ErrorPage";
import PlantPage from "./Pages/PlantPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "mygarden",
				element: <MyGardenPage />,
			},
			{
				path: "nutrients",
				element: <NutrientsPage />,
			},
			{
				path: "plants/:id", // Use a dynamic route to capture the plant ID
				element: <PlantPage />,
			},
			{
				path: "signup",
				element: <SignUpPage />,
			},
			{
				path: "login",
				element: <LogInPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
]);

export default router;
