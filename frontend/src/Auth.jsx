import axios from "axios";

export const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

export const getToken = () => {
	const user = getCurrentUser();
	return user?.token;
};

export const isAuthenticated = () => {
	return !!getToken();
};

const API_URL = "http://localhost:8000/api/v1/users/"; // Adjust this URL as needed

export const login = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}login/`, { email, password });
		if (response.data.token) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	} catch (error) {
		throw error; // Throw the error to allow error handling in the calling function
	}
};

export const logout = async () => {
	try {
		await axios.post(
			`${API_URL}logout/`,
			{},
			{
				headers: { Authorization: `Token ${getToken()}` },
			}
		);
		localStorage.removeItem("user");
	} catch (error) {
		console.error("Logout error", error); // Log the error for debugging purposes
	}
};

export const signup = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}signup/`, { email, password });
		if (response.data.token) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	} catch (error) {
		throw error; // Throw the error to allow error handling in the calling function
	}
};
