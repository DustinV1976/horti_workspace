import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./Pages/HomePage.jsx";
import NutrientsPage from "./Pages/NutrientsPage.jsx";
import MyGardenPage from "./Pages/MyGardenPage.jsx";
import SignUp from "./Pages/SignUp.jsx";
import LogIn from "./Pages/LogInPage.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import { userConfirmation } from "./utilities";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		loader: userConfirmation,
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
