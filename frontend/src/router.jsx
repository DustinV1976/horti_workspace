import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./Pages/HomePage";
import NutrientsPage from "./Pages/NutrientsPage";
import MyGardenPage from "./Pages/MyGardenPage";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogInPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ErrorPage from "./Pages/ErrorPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,

		errorElement: <ErrorPage />,
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
				path: "signup",
				element: <SignUp />,
			},
			{
				path: "login",
				element: <LogIn />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
]);

export default router;
