const { Router } = require("express");
const router = Router();
const marketplaceProductCtrl = require("../controllers/marketproduct.contoller");
const { adminMdlw } = require("../middlewares/admin.middleware");

router.get("/", marketplaceProductCtrl.getAllMarketProducts);

router.get("/:categoryId", marketplaceProductCtrl.getProductsByCategory);

router.get("/:id", marketplaceProductCtrl.getMarketProductById);

router.post("/", adminMdlw, marketplaceProductCtrl.createMarketProduct);

router.put("/:id", adminMdlw, marketplaceProductCtrl.updateMarketProduct);

router.delete("/:id", adminMdlw, marketplaceProductCtrl.deleteMarketProduct);

module.exports = router;
