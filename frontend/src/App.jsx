import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import {
	Outlet,
	useLoaderData,
	useLocation,
	useNavigate,
} from "react-router-dom";
import "./App.css";
// import axios from "axios";

// const test_connection = async () => {
// 	try {
// 		let response = await axios.get("http://127.0.0.1:8000/api/test/");
// 		console.log("Connection successful:", response);
// 	} catch (error) {
// 		console.error("Error connecting to backend:", error);
// 	}
// };

// useEffect(() => {
// 	test_connection();
// }, []);

function App() {
	const [user, setUser] = useState(useLoaderData());
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		let nullUserUrls = ["/login", "/signup"];
		let isAllowed = nullUserUrls.includes(location.pathname);

		if (!isAllowed && !user) {
			navigate("/login"); // Example of redirect if user is not allowed
		}
	}, [location.pathname, user, navigate]); // Added 'navigate' to dependency array

	return (
		<>
			<Navbar setUser={setUser} user={user} />
			<Outlet context={{ user, setUser }} />
		</>
	);
}

export default App;
