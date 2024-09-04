import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./Pages/HomePage";
import NutrientsPage from "./Pages/NutrientsPage";
import MyGardenPage from "./Pages/MyGardenPage";
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import ErrorPage from "./Pages/ErrorPage";
import PlantPage from "./Pages/PlantPage";
import IndNutrientsPage from "./Pages/IndNutrientsPage";

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
				path: "nutrients/:id",
				element: <IndNutrientsPage />,
			},
			{
				path: "plants/:id",
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
				element: <ErrorPage />,
			},
		],
	},
]);

export default router;
