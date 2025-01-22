// components/withAdminAuth.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { makeAdminRequest } from "@/lib/ipTracking";

export function withAdminAuth<P extends object>(
	WrappedComponent: React.ComponentType<P>,
) {
	return function WithAdminAuthComponent(props: P) {
		const router = useRouter();
		const [isLoading, setIsLoading] = useState(true);

		useEffect(() => {
			const checkAuth = async () => {
				try {
					const token = localStorage.getItem("adminToken");
					if (!token) {
						router.push("/admin/login");
						return;
					}

					// Test admin access with any protected route
					const response = await makeAdminRequest(
						`${process.env.NEXT_PUBLIC_API_URL}/admin/test`,
						{ method: "GET" },
					);

					if (response === null) {
						// makeAdminRequest will handle the redirect
						return;
					}

					setIsLoading(false);
				} catch (error) {
					console.error("Auth check failed:", error);
					router.push("/admin/login");
				}
			};

			checkAuth();
		}, [router]);

		if (isLoading) {
			return (
				<div className="min-h-screen flex items-center justify-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
				</div>
			);
		}

		return <WrappedComponent {...props} />;
	};
}
