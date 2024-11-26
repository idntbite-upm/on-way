"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { api, setAuthToken } from "@/utils/api";
interface AuthContextType {
	user: any;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState(null);

	const login = async (email: string, password: string) => {
		try {
			const response = await api.post("/auth/login", { email, password });
			const { token, user } = response.data;

			localStorage.setItem("token", token);
			setAuthToken(token);
			setUser(user);
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setAuthToken();
		setUser(null);
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setAuthToken(token);
			// Fetch user data
			api
				.get("/auth/me")
				.then((response) => {
					setUser(response.data.user);
				})
				.catch(() => {
					localStorage.removeItem("token");
					setAuthToken();
				});
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
