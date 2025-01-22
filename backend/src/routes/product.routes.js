// backend/src/routes/product.routes.js
const { Router } = require("express");
const router = Router();
const productCtrl = require("../controllers/product.controller");
const { adminMdlw } = require("../middlewares/admin.middleware");

// Public routes
router.get("/", productCtrl.getAllProducts);
router.get("/:id", productCtrl.getProductById);

// Admin routes
router.use(adminMdlw); // Apply adminMdlw to all routes below this line

router.route("/").post(productCtrl.createProduct);

router
	.route("/:id")
	.put(productCtrl.updateProduct)
	.delete(productCtrl.deleteProduct);

module.exports = router;
