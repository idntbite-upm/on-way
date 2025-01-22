import { PopularProduct } from "@/types/analytics";

export const mockPopularProducts: PopularProduct[] = Array.from(
	{ length: 50 },
	(_, i) => ({
		id: `product-${i + 1}`,
		name: `Product ${i + 1}`,
		category: ["Electronics", "Clothing", "Food", "Books"][
			Math.floor(Math.random() * 4)
		],
		unitsSold: Math.floor(Math.random() * 10000),
		revenue: Math.floor(Math.random() * 100000),
		trend: Math.floor(Math.random() * 40) - 20,
	}),
);
