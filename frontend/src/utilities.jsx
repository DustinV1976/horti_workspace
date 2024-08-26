// import axios from "axios";

// export const api = axios.create({
// 	baseURL: "http://127.0.0.1:8000/api/v1/users",
// });

// export const userConfirmation = async () => {
// 	let token = localStorage.getItem("token");
// 	if (token) {
// 		api.defaults.headers.common["Authorization"] = `Token ${token}`;
// 		let response = await api.get("users/");
// 		if (response.status === 200) {
// 			return response.data.user;
// 		}
// 		delete api.defaults.headers.common["Authorization"];
// 	}
// 	return null;
// };

// export const userRegistration = async (email, password) => {
// 	let response = await api.post("/signup/", {
// 		email: email,
// 		password: password,
// 	});
// 	if (response.status === 201) {
// 		let { user, token } = response.data;
// 		localStorage.setItem("token", token);
// 		api.defaults.headers.common["Authorization"] = `Token ${token}`;
// 		return user;
// 	}
// 	alert(response.data);
// 	return null;
// };

// export const userLogIn = async (email, password) => {
// 	try {
// 		let response = await api.post("/login/", {
// 			email: email,
// 			password: password,
// 		});
// 		if (response.status === 200) {
// 			let { user, token } = response.data;
// 			localStorage.setItem("token", token);
// 			api.defaults.headers.common["Authorization"] = `Token ${token}`;
// 			return user;
// 		}
// 		alert(response.data);
// 		return null;
// 	} catch (error) {
// 		console.error("Login error:", error);
// 		alert("Login failed. Please check your credentials and try again.");
// 		return null;
// 	}
// };

// export const userLogOut = async () => {
// 	try {
// 		let response = await api.post("users/logout/");
// 		if (response.status === 204) {
// 			localStorage.removeItem("token");
// 			delete api.defaults.headers.common["Authorization"];
// 			return null;
// 		}
// 	} catch (error) {
// 		console.error("Logout error:", error);
// 		alert("Something went wrong and logout failed");
// 	}
// 	return null;
// };

// export const getUsersLists = async () => {
// 	try {
// 		let response = await api.get("lists/");
// 		if (response.status === 200) {
// 			return response.data;
// 		}
// 		alert(response.data);
// 		return [];
// 	} catch (e) {
// 		alert(e.message);
// 		return [];
// 	}
// };
