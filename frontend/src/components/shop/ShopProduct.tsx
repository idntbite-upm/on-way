import { Product } from "@/types/shop";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
			<div className="aspect-w-16 aspect-h-9">
				<img
					width="100%"
					height="100%"
					src={product.photo}
					alt={product.name}
					className="w-full h-48 object-cover"
				/>
			</div>
			<div className="p-4">
				<h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
				<p className="text-gray-600 mt-1 text-sm line-clamp-2">
					{product.desc}
				</p>
				<div className="mt-4 flex justify-between items-center">
					<span className="text-blue-600 font-bold">${product.price}</span>
					<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}
