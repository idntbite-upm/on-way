const { Router } = require("express");
const { adminMdlw } = require("../middlewares/admin.middleware");
const {
	ipTrackingMiddleware,
} = require("../middlewares/IpTracking.middleware");
const adminController = require("../controllers/admin.controller");
const { testAdminAccess } = require("../controllers/admin.controller");

const router = Router();

// router.use(adminMdlw);
router.use(ipTrackingMiddleware);

router.get("/test", testAdminAccess);
router.post("/login", adminController.adminLogin);
// router.post("/create", adminController.createAdmin);
// router.get("/verify", adminController.verifyAdminToken);

module.exports = router;
