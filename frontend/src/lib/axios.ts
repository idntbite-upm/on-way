import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

console.log("API URL:", API_URL); // Debug log

const api = axios.create({
	baseURL: API_URL,
	timeout: 10000,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

api.interceptors.request.use(
	(config) => {
		console.log("Request:", config.method, config.url); // Debug log
		if (config.method === "options") {
			config.headers["Access-Control-Max-Age"] = "86400";
		}
		return config;
	},
	(error) => {
		console.error("Request error:", error);
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const retryCount = error.config?.__retryCount || 0;

		if (retryCount < MAX_RETRIES) {
			error.config.__retryCount = retryCount + 1;
			await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
			return api(error.config);
		}

		return Promise.reject(error);
	},
);

export default api;
