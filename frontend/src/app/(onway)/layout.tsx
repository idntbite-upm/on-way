"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Drawer from "@/components/minicart/Drawer";
import Cart from "@/components/minicart/Cart";
import "./globals.css";
import { useEffect, useState } from "react";
import { useProductsStore } from "@/lib/useProductStore";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { products, isLoading, error, fetchData } = useProductsStore();

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleCartIconClick = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};
	return (
		<html lang="en">
			<body>
				<ClerkProvider>
					<div className={inter.className}>
						<Header onCartIconClick={handleCartIconClick} />
						<Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
							<Cart />
						</Drawer>
						<main className="min-h-screen pt-16">{children}</main>
						<Footer />
					</div>
				</ClerkProvider>
			</body>
		</html>
	);
}
