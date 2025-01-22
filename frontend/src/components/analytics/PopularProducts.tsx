"use client";

import { useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { PopularProduct } from "@/types/analytics";

interface PopularProductsProps {
	data: PopularProduct[];
}

export default function PopularProducts({ data }: PopularProductsProps) {
	const [metric, setMetric] = useState<"unitsSold" | "revenue">("unitsSold");
	const [limit, setLimit] = useState(10);

	const sortedData = data.sort((a, b) => b[metric] - a[metric]).slice(0, limit);

	return (
		<div className="h-full">
			<div className="flex gap-4 mb-4">
				<select
					value={metric}
					onChange={(e) => setMetric(e.target.value as "unitsSold" | "revenue")}
					className="px-3 py-1 border rounded"
				>
					<option value="unitsSold">Units Sold</option>
					<option value="revenue">Revenue</option>
				</select>

				<select
					value={limit}
					onChange={(e) => setLimit(Number(e.target.value))}
					className="px-3 py-1 border rounded"
				>
					<option value={10}>Top 10</option>
					<option value={25}>Top 25</option>
					<option value={50}>Top 50</option>
				</select>
			</div>

			<ResponsiveContainer width="100%" height="90%">
				<BarChart
					data={sortedData}
					layout="vertical"
					margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
				>
					<XAxis type="number" />
					<YAxis type="category" dataKey="name" width={100} />
					<Tooltip
						formatter={(value) => (metric === "revenue" ? `$${value}` : value)}
					/>
					<Bar dataKey={metric} fill="#3b82f6" radius={[0, 4, 4, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
