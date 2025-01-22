"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { BsBarChart, BsGlobe, BsCart4, BsClock } from "react-icons/bs";
import PurchaseDensityMap from "@/components/analytics/PurchaseDensityMap";
import { productCategories } from "@/data/categoryMapData";
import { mockPopularProducts } from "@/data/mockPopularProducts";
import PopularProducts from "@/components/analytics/PopularProducts";

interface AnalyticsOption {
	id: string;
	title: string;
	description: string;
	icon: React.ElementType;
}

const analyticsOptions: AnalyticsOption[] = [
	{
		id: "purchase-density",
		title: "Purchase Density",
		description: "Analysis of purchase concentration across time periods",
		icon: BsBarChart,
	},
	{
		id: "purchase-frequency",
		title: "Purchase Frequency",
		description: "How often customers make repeat purchases",
		icon: BsClock,
	},
	{
		id: "popular-products",
		title: "Most Bought Products",
		description: "Top performing products by sales volume",
		icon: BsCart4,
	},
	{
		id: "regional-sales",
		title: "Purchase per Region",
		description: "Geographic distribution of sales",
		icon: BsGlobe,
	},
];

export default function AnalyticsPage() {
	const [selectedAnalytic, setSelectedAnalytic] =
		useState<string>("purchase-density");
	const [selectedCategory, setSelectedCategory] = useState<string>(
		productCategories[0].id,
	);

	const selectedOption = analyticsOptions.find(
		(option) => option.id === selectedAnalytic,
	);
	const selectedCategoryData = productCategories.find(
		(cat) => cat.id === selectedCategory,
	);

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Analytics Dashboard</h1>

				<select
					value={selectedAnalytic}
					onChange={(e) => setSelectedAnalytic(e.target.value)}
					className="px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					{analyticsOptions.map((option) => (
						<option key={option.id} value={option.id}>
							{option.title}
						</option>
					))}
				</select>
			</div>

			{selectedOption && (
				<Card className="p-6">
					<div className="flex items-center space-x-4">
						<div className="p-3 bg-blue-100 rounded-full">
							<selectedOption.icon className="w-6 h-6 text-blue-600" />
						</div>
						<div>
							<h3 className="text-lg font-semibold">{selectedOption.title}</h3>
							<p className="text-sm text-gray-500">
								{selectedOption.description}
							</p>
						</div>
					</div>

					<div className="mt-6 h-96 bg-gray-100 rounded-lg">
						{selectedAnalytic === "purchase-density" && (
							<div className="h-full">
								<div className="p-4">
									<select
										value={selectedCategory}
										onChange={(e) => setSelectedCategory(e.target.value)}
										className="px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										{productCategories.map((category) => (
											<option key={category.id} value={category.id}>
												{category.name}
											</option>
										))}
									</select>
								</div>
								<PurchaseDensityMap
									points={selectedCategoryData?.heatmapData || []}
								/>
							</div>
						)}
						{selectedAnalytic === "purchase-frequency" && (
							<p className="text-gray-500">
								Purchase Frequency Analysis Coming Soon
							</p>
						)}
						{selectedAnalytic === "popular-products" && (
							<PopularProducts data={mockPopularProducts} />
						)}
						{selectedAnalytic === "regional-sales" && (
							<p className="text-gray-500">Regional Sales Map Coming Soon</p>
						)}
					</div>
				</Card>
			)}
		</div>
	);
}
