import { ProductCategory } from "@/types/analytics";

function generateRandomPoints(
	centerLat: number,
	centerLng: number,
	count: number,
): Array<{ lat: number; lng: number; weight: number }> {
	const points = [];
	for (let i = 0; i < count; i++) {
		// Generate points within ~2km radius
		const lat = centerLat + (Math.random() - 0.5) * 0.04;
		const lng = centerLng + (Math.random() - 0.5) * 0.04;
		const weight = Math.floor(Math.random() * 10) + 1; // Weight between 1-10
		points.push({ lat, lng, weight });
	}
	return points;
}

export const productCategories: ProductCategory[] = [
	{
		id: "electronics",
		name: "Electronics",
		heatmapData: [
			...generateRandomPoints(31.6258257, -7.9891608, 100), // Marrakech
			...generateRandomPoints(33.5945144, -7.6200284, 100), // Casablanca
		],
	},
	{
		id: "clothing",
		name: "Clothing",
		heatmapData: [
			...generateRandomPoints(31.6258257, -7.9891608, 100), // Marrakech
			...generateRandomPoints(33.5945144, -7.6200284, 100), // Casablanca
		],
	},
];
