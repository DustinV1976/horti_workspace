import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import {
	Outlet,
	useLoaderData,
	useLocation,
	useNavigate,
} from "react-router-dom";
import "./App.css";

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
