import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const api = axios.create({
	baseURL: `${API_URL}/api/v1`,
	withCredentials: true,
});

// Add token to requests
export const setAuthToken = (token?: string) => {
	if (token) {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete api.defaults.headers.common["Authorization"];
	}
};
