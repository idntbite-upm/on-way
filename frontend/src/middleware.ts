import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { makeAdminRequest } from "@/lib/ipTracking";

const isPublicRoute = createRouteMatcher([
	"/",
	"/sign-in(.*)",
	"/sign-up(.*)",
	"/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
	if (!isPublicRoute(req)) await auth.protect();
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
		"/admin/:path*",
	],
};

export async function middleware(request: NextRequest) {
	// Check if it's an admin route
	if (request.nextUrl.pathname.startsWith("/admin/login")) {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/test`,
				{
					headers: {
						"X-Real-IP": request.ip || "",
					},
				},
			);

			if (!response.ok) {
				console.error("IP check failed", response.status);
				return NextResponse.redirect(new URL("/", request.url));
			}

			return NextResponse.next();
		} catch (error) {
			console.error("IP check error", error);
			return NextResponse.redirect(new URL("/", request.url));
		}
	} else {
		// For non-admin routes, get a guest token if one doesn't exist
		const response = NextResponse.next();

		try {
			// Check if guest token already exists
			const existingToken = request.cookies.get("guest-token");

			if (!existingToken) {
				// Fetch guest token
				const tokenResponse = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/token`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					},
				);

				if (tokenResponse.ok) {
					const { token } = await tokenResponse.json();

					// Set the token in cookies
					response.cookies.set({
						name: "guest-token",
						value: token,
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
						sameSite: "lax",
						// Token expires in 24 hours
						maxAge: 60 * 60 * 24,
						path: "/",
					});
				} else {
					console.error("Failed to fetch guest token", tokenResponse.status);
				}
			}
		} catch (error) {
			console.error("Error fetching guest token:", error);
		}

		return response;
	}
}
