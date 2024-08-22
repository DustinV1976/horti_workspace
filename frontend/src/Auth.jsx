// import axios from "axios";

// const API_URL = "http://localhost:8000/api/v1/users/"; // Adjust if your backend URL is different

// export const getCurrentUser = () => {
// 	return JSON.parse(localStorage.getItem("user"));
// };

// export const getToken = () => {
// 	const user = getCurrentUser();
// 	return user?.token;
// };

// export const isAuthenticated = () => {
// 	return !!getToken();
// };

// export const login = async (email, password) => {
// 	try {
// 		const response = await axios.post(`${API_URL}login/`, { email, password });
// 		if (response.data.token) {
// 			localStorage.setItem(
// 				"user",
// 				JSON.stringify({
// 					email: response.data.custom_user,
// 					token: response.data.token,
// 				})
// 			);
// 		}
// 		return response.data;
// 	} catch (error) {
// 		console.error("Login error", error.response?.data || error.message);
// 		throw error;
// 	}
// };

// export const logout = async () => {
// 	try {
// 		await axios.post(
// 			`${API_URL}logout/`,
// 			{},
// 			{
// 				headers: { Authorization: `Token ${getToken()}` },
// 			}
// 		);
// 		localStorage.removeItem("user");
// 	} catch (error) {
// 		console.error("Logout error", error);
// 		throw error;
// 	}
// };

// export const signup = async (email, password) => {
// 	try {
// 	  const response = await axios.post(`${API_URL}signup/`, { email, password });
// 	  if (response.data.token) {
// 		localStorage.setItem("user", JSON.stringify({
// 		  email: response.data.user,
// 		  token: response.data.token
// 		}));
// 	  }
// 	  return response.data;
// 	} catch (error) {
// 	  if (error.response && error.response.data.message) {
// 		throw new Error(error.response.data.message);
// 	  }
// 	  throw error;
// 	}
//   };
