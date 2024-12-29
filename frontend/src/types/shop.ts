export interface Shop {
	_id: string;
	name: string;
	description: string;
	openingTime: string;
	closingTime: string;
	rating: number;
	orderCount: number;
	isOpen: boolean;
	location: string;
	products: Product[];
}

export interface Product {
	_id: string;
	name: string;
	photo: string;
	price: number;
	desc: string;
	shop: string;
}
