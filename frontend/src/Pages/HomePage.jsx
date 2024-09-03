import React from "react";

const HomePage = () => {
	return (
		<div style={styles.container}>
			<h1 style={styles.heading}>Welcome</h1>
		</div>
	);
};

const styles = {
	container: {
		backgroundImage: `url('/images/tree_book2.jpeg')`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingTop: "20px",
	},
	heading: {
		color: "white",
		textAlign: "center",
		fontSize: "4.5rem",
	},
};

export default HomePage;
