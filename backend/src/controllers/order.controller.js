const OrderSub = require("../models/order.model");
const OrderTracking = require("../models/orderTracking.model");
const generateOrderId = require("../utils/orderIdGenerator");

exports.createOrder = async (req, res) => {
	try {
		// Debug request body
		console.log("Request body:", req.body);

		// Validate required fields
		if (!req.body.items || !Array.isArray(req.body.items)) {
			throw new Error("Invalid items array");
		}

		// Debug order ID generation
		const orderId = await generateOrderId(OrderSub);
		console.log("Generated orderId:", orderId);

		// Create order with logging
		const orderData = {
			...req.body,
			orderId,
			status: "pending",
		};
		console.log("Creating order with data:", orderData);

		const order = new OrderSub(orderData);
		await order.save();
		console.log("Order saved:", order);

		// Create tracking with logging
		const trackingData = {
			orderId,
			status: "PENDING",
			location: {
				lat: 0,
				lng: 0,
				updatedAt: new Date(),
			},
			trackingHistory: [
				{
					location: { lat: 0, lng: 0 },
					status: "PENDING",
					timestamp: new Date(),
				},
			],
		};
		console.log("Creating tracking with data:", trackingData);

		const tracking = new OrderTracking(trackingData);
		await tracking.save();
		console.log("Tracking saved:", tracking);

		res.status(201).json({
			ok: true,
			data: { order, tracking },
		});
	} catch (error) {
		console.error("Order creation error:", error);
		console.error("Error stack:", error.stack);
		res.status(500).json({
			ok: false,
			message: error.message,
			stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
		});
	}
};
