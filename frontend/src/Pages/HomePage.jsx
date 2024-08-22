import { useOutletContext } from "react-router-dom";

const HomePage = () => {
	const context = useOutletContext();
	const user = context ? context.user : null;

	return <h1>Welcome{user ? ` ${user}` : ""}</h1>;
};

export default HomePage;
