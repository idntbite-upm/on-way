const { Router } = require("express");
const router = Router();
const { authMdlw } = require("../middlewares/auth.middleware");
const orderTrackingController = require("../controllers/orderTracking.controller");

// Verify handlers exist before using them
if (
	!orderTrackingController.getOrderStatus ||
	!orderTrackingController.updateOrderStatus
) {
	throw new Error(
		"Order tracking controller methods are not properly exported",
	);
}

router.get("/:orderId", (req, res, next) => {
	if (typeof orderTrackingController.getOrderStatus !== "function") {
		return next(new Error("getOrderStatus handler is not a function"));
	}
	orderTrackingController.getOrderStatus(req, res, next);
});

router.put("/:orderId", (req, res, next) => {
	if (typeof orderTrackingController.updateOrderStatus !== "function") {
		return next(new Error("updateOrderStatus handler is not a function"));
	}
	orderTrackingController.updateOrderStatus(req, res, next);
});

module.exports = router;
