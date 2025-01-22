"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { Shop } from "@/types/shop";
import { Category } from "@/types/category";

export default function MarketplacePage() {
	const [shop, setShop] = useState<Shop | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

	useEffect(() => {
		const fetchMarketplaceData = async () => {
			try {
				const [shopResponse, categoriesResponse] = await Promise.all([
					api.get(
						`${process.env.NEXT_PUBLIC_API_URL}/api/v1/shops/6770611c65fe2ba532c1c196`,
					),
					api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`),
				]);

				setShop(shopResponse.data.data);
				setCategories(categoriesResponse.data.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching marketplace data:", error);
				setError("Failed to load marketplace");
				setLoading(false);
			}
		};
		fetchMarketplaceData();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
				<div className="animate-pulse flex space-x-4">
					<div className="h-12 w-12 bg-blue-200 rounded-full"></div>
					<div className="space-y-3">
						<div className="h-4 w-32 bg-blue-200 rounded"></div>
						<div className="h-4 w-24 bg-blue-200 rounded"></div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
				<div className="bg-red-50 p-6 rounded-xl border border-red-100">
					<p className="text-red-600 font-medium">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 pt-20">
			<div className="container mx-auto px-4 py-8">
				{/* Marketplace Banner */}
				<div className="bg-white rounded-xl shadow-lg p-8 mb-12">
					<h1 className="text-4xl font-bold text-gray-800 mb-4">
						{shop?.name} Marketplace
					</h1>
					<p className="text-gray-600 text-lg">{shop?.description}</p>
				</div>

				{/* Categories Grid */}
				<h2 className="text-2xl font-bold text-gray-800 mb-8">
					Shop by Category
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{categories.map((category) => (
						<Link
							key={category._id}
							href={`/marketplace/${category.slug}`}
							className="block group"
						>
							<div
								className="relative h-64 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
								onMouseEnter={() => setHoveredCategory(category._id)}
								onMouseLeave={() => setHoveredCategory(null)}
							>
								{/* Category Image */}
								<div className="absolute inset-0">
									<img
										src={category.image}
										alt={category.name}
										className="w-full h-full object-cover"
									/>
								</div>

								{/* Gradient Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />

								{/* Category Content */}
								<div className="absolute bottom-0 left-0 right-0 p-6">
									<h3 className="text-2xl font-bold text-white mb-2">
										{category.name}
									</h3>
									<p className="text-white/80">{category.description}</p>
								</div>

								{/* Hover Effect */}
								<div
									className={`absolute inset-0 bg-blue-600/20 transition-opacity duration-300 ${
										hoveredCategory === category._id
											? "opacity-100"
											: "opacity-0"
									}`}
								/>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
