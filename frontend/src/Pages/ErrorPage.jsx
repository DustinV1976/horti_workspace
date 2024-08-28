import errImg from "/images/error.jpg";

const ErrorPage = () => {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		
			<img src={errImg} alt="Error" style={{ height: "90vh", width: "90vw" }} />
		</div>
	);
};

export default ErrorPage;
