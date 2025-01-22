import CartItem from "./CartItem";
import { useRouter } from "next/navigation"; // Changed from next/router
import { useCartStore } from "@/lib/useCartStore";
import useFromStore from "@/hooks/useFromStore";
import { useState } from "react";

function Cart() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const cart = useFromStore(useCartStore, (state) => state.cart);
	const clearCart = useCartStore((state) => state.clearCart);

	let total = 0;
	if (cart) {
		total = cart.reduce(
			(acc, product) => acc + product.price * (product.quantity as number),
			0,
		);
	}

	const handleCheckout = async () => {
		setIsLoading(true);
		try {
			router.push("/checkout");
		} catch (error) {
			console.error("Error navigating to checkout:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section>
			<h3 className="text-2xl font-bold mb-4">Shopping Cart</h3>
			<ul className="divide-y divide-gray-200">
				{cart?.map((product) => (
					<CartItem key={product._id} product={product} />
				))}
			</ul>
			<div className="mt-6 space-y-4">
				<div className="flex justify-between items-center">
					<span className="text-lg font-medium">Total</span>
					<span className="text-xl font-bold">${total.toFixed(2)}</span>
				</div>
				<button
					onClick={handleCheckout}
					disabled={!cart?.length || isLoading}
					className="w-full bg-blue-600 text-white py-2 px-4 rounded-md
            hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50
            disabled:cursor-not-allowed"
				>
					{isLoading ? "Processing..." : "Proceed to Checkout"}
				</button>
			</div>
		</section>
	);
}

export default Cart;
