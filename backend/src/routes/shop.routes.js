// backend/src/routes/shop.routes.js
const express = require("express");
const router = express.Router();
const shopCtrl = require("../controllers/shop.controller");
const { adminMdlw } = require("../middlewares/admin.middleware");

// Public routes
router.get("/", shopCtrl.getAllShops);
router.get("/:id", shopCtrl.getShopById);
router.get("/:shopId/products", shopCtrl.getShopProducts);

// Admin routes
router.use(adminMdlw); // Apply adminMdlw to all routes below this line

router.route("/").post(shopCtrl.createShop);

router.route("/:id").put(shopCtrl.updateShop).delete(shopCtrl.deleteShop);

module.exports = router;
