const Order = require("../models/orderTracking.model");

const orderTrackingController = {
	getOrderStatus: async (req, res) => {
		try {
			const { orderId } = req.params;
			const order = await Order.findOne({ orderId });

			if (!order) {
				return res.status(404).json({
					ok: false,
					message: "Order not found",
				});
			}

			res.json({
				ok: true,
				data: order,
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				message: error.message,
			});
		}
	},

	updateOrderStatus: async (req, res) => {
		try {
			const { orderId } = req.params;
			const { status } = req.body;

			const order = await Order.findOneAndUpdate(
				{ orderId },
				{ status },
				{ new: true },
			);

			if (!order) {
				return res.status(404).json({
					ok: false,
					message: "Order not found",
				});
			}

			res.json({
				ok: true,
				data: order,
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				message: error.message,
			});
		}
	},
};

module.exports = orderTrackingController;
