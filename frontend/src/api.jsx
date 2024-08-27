import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8000/api/v1/", // Adjust this to match your Django backend URL
});

export const setAuthToken = (token) => {
	if (token) {
		api.defaults.headers.common["Authorization"] = `Token ${token}`;
		localStorage.setItem("authToken", token);
	} else {
		delete api.defaults.headers.common["Authorization"];
		localStorage.removeItem("authToken");
	}
};

export const clearAuthToken = () => {
	delete api.defaults.headers.common["Authorization"];
	localStorage.removeItem("authToken");
};

// Authentication
export const login = (credentials) => api.post("users/login/", credentials);
export const signup = (userData) => api.post("users/signup/", userData);
export const logout = async () => {
	try {
		await api.post("users/logout/");
		clearAuthToken();
	} catch (error) {
		console.error("Logout failed:", error);
		// Even if the server request fails, we still want to clear the token on the client side
		clearAuthToken();
	}
};

// Plants
export const getPlants = () => api.get("plants/");
export const addPlant = (plantData) => api.post("plants/", plantData);
export const updatePlant = (plantId, plantData) =>
	api.put(`plants/${plantId}/`, plantData);
export const deletePlant = (plantId) => api.delete(`plants/${plantId}/`);

// Nutrients
export const getNutrients = () => api.get("nutrients/");
export const addNutrient = (nutrientData) =>
	api.post("nutrients/", nutrientData);
export const updateNutrient = (nutrientId, nutrientData) =>
	api.put(`nutrients/${nutrientId}/`, nutrientData);
export const deleteNutrient = (nutrientId) =>
	api.delete(`nutrients/${nutrientId}/`);

export default api;
