const Order = require("../models/order.model");

class TrackingService {
	constructor(io) {
		this.io = io;
	}

	async updateLocation(orderId, location) {
		try {
			const order = await Order.findOneAndUpdate(
				{ orderId },
				{
					$set: { currentLocation: location },
					$push: {
						locationHistory: {
							...location,
							timestamp: new Date(),
						},
					},
				},
				{ new: true },
			);

			if (!order) {
				throw new Error("Order not found");
			}

			this.io.to(`order-${orderId}`).emit("location-update", {
				orderId,
				location,
				timestamp: new Date(),
			});

			return order;
		} catch (error) {
			console.error("Location update failed:", error);
			throw error;
		}
	}

	async updateOrderStatus(orderId, status, message) {
		try {
			const order = await Order.findOneAndUpdate(
				{ orderId },
				{
					$set: { status },
					$push: {
						statusHistory: {
							status,
							message,
							timestamp: new Date(),
						},
					},
				},
				{ new: true },
			);

			if (!order) {
				throw new Error("Order not found");
			}

			this.io.to(`order-${orderId}`).emit("status-update", {
				orderId,
				status,
				message,
				timestamp: new Date(),
			});

			return order;
		} catch (error) {
			console.error("Status update failed:", error);
			throw error;
		}
	}

	async updateETA(orderId, eta) {
		try {
			const order = await Order.findOneAndUpdate(
				{ orderId },
				{ $set: { estimatedDeliveryTime: eta } },
				{ new: true },
			);

			if (!order) {
				throw new Error("Order not found");
			}

			this.io.to(`order-${orderId}`).emit("eta-update", {
				orderId,
				eta,
				timestamp: new Date(),
			});

			return order;
		} catch (error) {
			console.error("ETA update failed:", error);
			throw error;
		}
	}

	async assignDriver(orderId, driverId, driverInfo) {
		try {
			const order = await Order.findOneAndUpdate(
				{ orderId },
				{
					$set: {
						driverId,
						driverInfo,
						assignedAt: new Date(),
					},
				},
				{ new: true },
			);

			if (!order) {
				throw new Error("Order not found");
			}

			this.io.to(`order-${orderId}`).emit("driver-assigned", {
				orderId,
				driverId,
				driverInfo,
				timestamp: new Date(),
			});

			return order;
		} catch (error) {
			console.error("Driver assignment failed:", error);
			throw error;
		}
	}

	subscribeToUpdates(orderId, socket) {
		socket.join(`order-${orderId}`);
		console.log(`Client subscribed to order updates: ${orderId}`);
	}

	unsubscribeFromUpdates(orderId, socket) {
		socket.leave(`order-${orderId}`);
		console.log(`Client unsubscribed from order updates: ${orderId}`);
	}
}

module.exports = TrackingService;
