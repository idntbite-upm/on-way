const socketIO = require("socket.io");
const Order = require("../models/orderTracking.model");
const mongoose = require("mongoose");

function initializeSocket(server) {
	const io = socketIO(server, {
		cors: {
			origin: process.env.FRONTEND_URL || "http://localhost:3000",
			methods: ["GET", "POST", "PUT", "DELETE"],
		},
	});

	// Watch for changes in orders collection
	const orderChangeStream = Order.watch();

	orderChangeStream.on("change", async (change) => {
		try {
			if (change.operationType === "update") {
				const orderId = change.documentKey._id;
				const order = await Order.findById(orderId);

				if (order) {
					io.to(`order-${order.orderId}`).emit("order-update", {
						orderId: order.orderId,
						status: order.status,
						location: order.location,
						trackingHistory: order.trackingHistory,
					});
				}
			}
		} catch (error) {
			console.error("Change stream error:", error);
		}
	});

	io.on("connection", (socket) => {
		console.log("Client connected:", socket.id);

		socket.on("join-tracking", async (orderId) => {
			try {
				socket.join(`order-${orderId}`);
				const order = await Order.findOne({ orderId });
				if (order) {
					socket.emit("initial-data", {
						orderId: order.orderId,
						status: order.status,
						location: order.location,
						trackingHistory: order.trackingHistory,
					});
				}
			} catch (error) {
				console.error("Join tracking error:", error);
			}
		});

		socket.on("update-location", async (data) => {
			try {
				const { orderId, location } = data;
				await Order.findOneAndUpdate(
					{ orderId },
					{
						$set: { location },
						$push: {
							trackingHistory: {
								location,
								status: "IN_TRANSIT",
								timestamp: new Date(),
							},
						},
					},
				);
			} catch (error) {
				console.error("Location update error:", error);
			}
		});

		socket.on("disconnect", () => {
			console.log("Client disconnected:", socket.id);
		});
	});

	// Error handling for change stream
	orderChangeStream.on("error", (error) => {
		console.error("Order change stream error:", error);
	});

	return io;
}

module.exports = initializeSocket;
