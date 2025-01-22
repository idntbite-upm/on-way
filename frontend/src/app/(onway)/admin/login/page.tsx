"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { LockClosedIcon } from "@heroicons/react/24/solid";

interface LoginForm {
	email: string;
	password: string;
}

interface LoginResponse {
	ok: boolean;
	data?: {
		token: string;
		admin: {
			id: string;
			email: string;
		};
	};
	message?: string;
	redirect?: string;
}

export default function AdminLogin() {
	const router = useRouter();
	const [formData, setFormData] = useState<LoginForm>({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			// Initial login request
			const loginResponse = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				},
			);

			const data: LoginResponse = await loginResponse.json();

			if (data.ok && data.data?.token) {
				// Store token and admin data
				localStorage.setItem("adminToken", data.data.token);
				localStorage.setItem("adminData", JSON.stringify(data.data.admin));

				// Test IP access with admin/test endpoint
				const testResponse = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/test`,
					{
						headers: {
							Authorization: `Bearer ${data.data.token}`,
						},
					},
				);

				const testData = await testResponse.json();

				if (testData.redirect) {
					// Clear stored data if IP is not recognized
					localStorage.removeItem("adminToken");
					localStorage.removeItem("adminData");
					toast.error("Access denied from this IP address");
					router.push("/");
					return;
				}

				toast.success("Login successful!");
				router.push("/admin/dashboard");
			} else {
				setError(data.message || "Login failed");
				toast.error(data.message || "Login failed");
			}
		} catch (err) {
			console.error("Login error:", err);
			setError("An error occurred during login");
			toast.error("An error occurred during login");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Admin Login
					</h2>
					{error && (
						<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								disabled={loading}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
								disabled={loading}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-sm">
							<span className="text-gray-500">
								Access is restricted to known IP addresses
							</span>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
								loading
									? "bg-indigo-400 cursor-not-allowed"
									: "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							}`}
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
							</span>
							{loading ? (
								<div className="flex items-center">
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Signing in...
								</div>
							) : (
								"Sign in"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
