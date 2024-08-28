import axios from "axios";

// Create an Axios instance with the base URL
const api = axios.create({
	baseURL: "http://localhost:8000/api/v1/", // Adjust this to match your Django backend URL
});

// Function to set the Authorization token in the headers
export const setAuthToken = (token) => {
	if (token) {
		api.defaults.headers.common["Authorization"] = `Token ${token}`;
		localStorage.setItem("authToken", token);
	} else {
		delete api.defaults.headers.common["Authorization"];
		localStorage.removeItem("authToken");
	}
};

// Function to clear the Authorization token from the headers
export const clearAuthToken = () => {
	delete api.defaults.headers.common["Authorization"];
	localStorage.removeItem("authToken");
};

// Authentication Functions
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

// Plant API Functions
export const getPlants = () => api.get("plants/");
export const addPlant = (plantData) => api.post("plants/", plantData);
export const updatePlant = (id, plantData) =>
	api.put(`plants/${id}/`, plantData);
export const deletePlant = (id) => api.delete(`plants/${id}/`);

// Nutrient API Functions
export const getNutrients = () => api.get("nutrients/");
export const addNutrient = (nutrientData) =>
	api.post("nutrients/", nutrientData);
export const updateNutrient = (nutrientId, nutrientData) =>
	api.put(`nutrients/${nutrientId}/`, nutrientData);
export const deleteNutrient = (nutrientId) =>
	api.delete(`nutrients/${nutrientId}/`);

export default api;
