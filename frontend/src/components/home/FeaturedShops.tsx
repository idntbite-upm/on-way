"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import api from "@/lib/axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Shop {
	id: string;
	name: string;
	category: string;
	rating: number;
	imageUrl: string;
}

export default function FeaturedShops() {
	const [shops, setShops] = useState<Shop[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchShops = async () => {
			try {
				const response = await api.get(
					`${process.env.NEXT_PUBLIC_API_URL}/api/v1/shops`,
				);
				setShops(response.data.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching shops:", error);
				setError("Failed to load shops");
				setLoading(false);
			}
		};
		fetchShops();
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	if (loading) {
		return (
			<div className="py-20 bg-gradient-to-b from-gray-50 to-white">
				<div className="container mx-auto px-4">
					<div className="text-center text-lg font-medium text-gray-600">
						<div className="animate-pulse">Loading shops...</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="py-20 bg-gradient-to-b from-gray-50 to-white">
				<div className="container mx-auto px-4">
					<div className="text-center text-red-600 font-medium text-lg">
						{error}
					</div>
				</div>
			</div>
		);
	}

	return (
		<section className="py-20 bg-gradient-to-b from-gray-50 to-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Popular Shops
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Discover our most beloved local shops and explore their unique
						offerings
					</p>
				</div>

				<div className="w-full max-w-[1200px] mx-auto px-8">
					{shops.length > 0 ? (
						<Slider {...settings}>
							{shops.map((shop) => (
								<div key={shop.id} className="shop-slide outline-none">
									<div className="px-3">
										<div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
											{/* Image Container */}
											<div className="relative w-full h-56 rounded-t-2xl overflow-hidden">
												{shop.imageUrl ? (
													<Image
														src={shop.imageUrl}
														alt={shop.name}
														fill
														className="object-cover"
														sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
													/>
												) : (
													<div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
														<span className="text-5xl">🏪</span>
													</div>
												)}
											</div>

											{/* Content Container */}
											<div className="p-6">
												<h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
													{shop.name}
												</h3>
												<p className="text-gray-600 mb-3 text-sm font-medium uppercase tracking-wide">
													{shop.category}
												</p>
												<div className="flex items-center justify-between">
													<div className="flex items-center space-x-1">
														<span className="text-yellow-400 text-lg">⭐</span>
														<span className="font-semibold text-gray-700">
															{shop.rating.toFixed(1)}
														</span>
													</div>
													<button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
														View Details →
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</Slider>
					) : (
						<div className="text-center text-gray-500 text-lg font-medium">
							No shops available at the moment
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
