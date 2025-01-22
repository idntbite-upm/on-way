// backend/src/routes/marketproduct.routes.js
const { Router } = require("express");
const router = Router();
const marketplaceProductCtrl = require("../controllers/marketproduct.contoller");
const { adminMdlw } = require("../middlewares/admin.middleware");

// Public routes
router.get("/", marketplaceProductCtrl.getAllMarketProducts);
router.get(
	"/category/:categoryId",
	marketplaceProductCtrl.getProductsByCategory,
);
router.get("/product/:id", marketplaceProductCtrl.getMarketProductById);

// Admin routes
router.use(adminMdlw); // Apply adminMdlw to all routes below this line

router.route("/").post(marketplaceProductCtrl.createMarketProduct);

router
	.route("/:id")
	.put(marketplaceProductCtrl.updateMarketProduct)
	.delete(marketplaceProductCtrl.deleteMarketProduct);

module.exports = router;
