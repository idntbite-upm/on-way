"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/useCartStore";
import useFromStore from "@/hooks/useFromStore";
import { BsCheckCircle, BsTruck, BsCreditCard } from "react-icons/bs";
import api from "@/lib/axios";
import { useUser } from "@clerk/nextjs";
import generateTempOrderId from "@/lib/generateTempOrderId";

interface ShippingFormData {
	fullName: string;
	address: string;
	city: string;
	postalCode: string;
	phone: string;
}

const CheckoutPage = () => {
	const { user, isLoaded } = useUser();
	const router = useRouter();
	const cart = useFromStore(useCartStore, (state) => state.cart);
	const clearCart = useCartStore((state) => state.clearCart);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [shippingData, setShippingData] = useState<ShippingFormData>({
		fullName: "",
		address: "",
		city: "",
		postalCode: "",
		phone: "",
	});
	const [loading, setLoading] = useState(false);

	const total =
		cart?.reduce(
			(acc, item) => acc + item.price * (item.quantity as number),
			0,
		) || 0;
	const shipping_fee = 10;
	const final_total = total + shipping_fee;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!isLoaded || !user) {
			console.error("User not authenticated");
			return;
		}

		try {
			const tempOrderId = generateTempOrderId();

			const orderData = {
				orderId: tempOrderId,
				items: cart?.map((item) => ({
					product: item._id,
					productType: "Product",
					quantity: item.quantity,
					price: item.price,
				})),
				shippingAddress: `${shippingData.fullName}, ${shippingData.address}, ${shippingData.city}, ${shippingData.postalCode}`,
				location: "0,0",
				total: final_total,
			};

			const response = await api.post("/api/v1/orders", orderData);

			if (response.data.ok) {
				clearCart();
				router.push("/track");
			}
		} catch (error) {
			console.error("Error creating order:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 pt-20">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
					<p className="mt-2 text-gray-600">
						Complete your order by providing your shipping details.
					</p>
				</div>

				{/* Checkout Steps */}
				<div className="flex items-center justify-center mb-12">
					<div className="flex items-center">
						<div className="flex items-center text-blue-600">
							<BsCheckCircle className="w-6 h-6" />
							<span className="ml-2 font-medium">Cart</span>
						</div>
						<div className="h-1 w-16 bg-blue-600 mx-4" />
						<div className="flex items-center text-blue-600">
							<BsTruck className="w-6 h-6" />
							<span className="ml-2 font-medium">Shipping</span>
						</div>
						<div className="h-1 w-16 bg-gray-200 mx-4" />
						<div className="flex items-center text-gray-400">
							<BsCreditCard className="w-6 h-6" />
							<span className="ml-2 font-medium">Payment</span>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Shipping Form */}
					<div className="bg-white p-8 rounded-xl shadow-sm">
						<h2 className="text-xl font-semibold mb-6">Shipping Details</h2>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Full Name
								</label>
								<input
									type="text"
									required
									value={shippingData.fullName}
									onChange={(e) =>
										setShippingData({
											...shippingData,
											fullName: e.target.value,
										})
									}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
									placeholder="Ahmed Ali"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Address
								</label>
								<input
									type="text"
									required
									value={shippingData.address}
									onChange={(e) =>
										setShippingData({
											...shippingData,
											address: e.target.value,
										})
									}
									className="w-full p-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
									placeholder="123 Street Name"
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										City
									</label>
									<input
										type="text"
										required
										value={shippingData.city}
										onChange={(e) =>
											setShippingData({
												...shippingData,
												city: e.target.value,
											})
										}
										className="w-full p-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
										placeholder="City"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Postal Code
									</label>
									<input
										type="text"
										required
										value={shippingData.postalCode}
										onChange={(e) =>
											setShippingData({
												...shippingData,
												postalCode: e.target.value,
											})
										}
										className="w-full p-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
										placeholder="12345"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Phone
								</label>
								<input
									type="tel"
									required
									value={shippingData.phone}
									onChange={(e) =>
										setShippingData({
											...shippingData,
											phone: e.target.value,
										})
									}
									className="w-full p-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
									placeholder="+212 612345667"
								/>
							</div>

							<button
								type="submit"
								disabled={isSubmitting || !cart?.length}
								className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
							>
								{isSubmitting ? "Processing..." : "Place Order"}
							</button>
						</form>
					</div>

					{/* Order Summary */}
					<div className="bg-white p-8 rounded-xl shadow-sm">
						<h2 className="text-xl font-semibold mb-6">Order Summary</h2>
						<div className="space-y-4">
							{cart?.map((item) => (
								<div
									key={item._id}
									className="flex items-center justify-between py-3 border-b"
								>
									<div className="flex items-center">
										<span className="font-medium">{item.name}</span>
										<span className="ml-2 text-sm text-gray-500">
											x {item.quantity}
										</span>
									</div>
									<span className="font-medium">
										${(item.price * (item.quantity as number)).toFixed(2)}
									</span>
								</div>
							))}

							<div className="pt-4 space-y-3">
								<div className="flex justify-between text-gray-600">
									<span>Subtotal</span>
									<span>${total.toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-gray-600">
									<span>Shipping</span>
									<span>${shipping_fee.toFixed(2)}</span>
								</div>
								<div className="flex justify-between font-bold text-lg pt-3 border-t">
									<span>Total</span>
									<span className="text-blue-600">
										${final_total.toFixed(2)}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
