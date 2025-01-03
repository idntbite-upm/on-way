const express = require("express");
const router = express.Router();
const shopCtrl = require("../controllers/shop.controller");
const { adminMdlw } = require("../middlewares/admin.middleware");
const { getShopProducts } = require("../controllers/shop.controller");

router.get("/", shopCtrl.getAllShops);

router.get("/:id", shopCtrl.getShopById);

router.post("/", adminMdlw, shopCtrl.createShop);

router.put("/:id", adminMdlw, shopCtrl.updateShop);

router.delete("/:id", adminMdlw, shopCtrl.deleteShop);

router.get("/:shopId/products", getShopProducts);

module.exports = router;
