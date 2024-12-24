// pages/shops/[shopname].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import api from "@/lib/axios";
import { useRouter } from "next/router";
import { Shop, Product } from "@/types/shop";

interface ShopPageProps {
	shop: Shop;
	products: Product[];
}

export default function ShopPage({ shop, products }: ShopPageProps) {
	const router = useRouter();

	// Show a loading state if the page is being generated
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-4">{shop.name}</h1>
			<p className="mb-8">{shop.location}</p>

			{products.length === 0 ? (
				<p>No products available</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product) => (
						<div
							key={product._id}
							className="bg-white rounded-xl shadow-sm p-4"
						>
							<h2 className="text-xl font-semibold">{product.name}</h2>
							<img
								src={product.photo}
								alt={product.name}
								className="w-full h-48 object-cover mb-4 rounded"
							/>
							<p className="text-gray-600 mb-2">{product.desc}</p>
							<p className="text-gray-800 font-bold">${product.price}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

// Generate paths for each shop
export const getStaticPaths: GetStaticPaths = async () => {
	const response = await api.get(
		`${process.env.NEXT_PUBLIC_API_URL}/api/v1/shops`,
	);

	const shops: Shop[] = response.data.data;

	const paths = shops.map((shop) => ({
		params: { shopname: shop.name.toLowerCase().replace(/\s+/g, "") },
	}));

	return { paths, fallback: true };
};

// Fetch shop and product data for the corresponding shop
export const getStaticProps: GetStaticProps = async (context) => {
	const { shopname } = context.params;
	const response = await api.get(
		`${process.env.NEXT_PUBLIC_API_URL}/api/v1/shops`,
	);

	const shops: Shop[] = response.data.data;

	const shop = shops.find(
		(shop) => shop.name.toLowerCase().replace(/\s+/g, "") === shopname,
	);

	if (!shop) {
		return { notFound: true };
	}

	const productResponse = await api.get(
		`${process.env.NEXT_PUBLIC_API_URL}/api/v1/shops/${shop._id}/products`,
	);
	const products: Product[] = productResponse.data.data;

	return {
		props: {
			shop,
			products,
		},
		revalidate: 10,
	};
};
