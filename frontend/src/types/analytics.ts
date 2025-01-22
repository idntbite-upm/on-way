export interface HeatmapPoint {
	lat: number;
	lng: number;
	weight?: number;
}

export interface ProductCategory {
	id: string;
	name: string;
	heatmapData: HeatmapPoint[];
}

export interface PopularProduct {
	id: string;
	name: string;
	category: string;
	unitsSold: number;
	revenue: number;
	trend: number;
}
