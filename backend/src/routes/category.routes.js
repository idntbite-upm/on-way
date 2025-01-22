// backend/src/routes/category.routes.js
const { Router } = require("express");
const router = Router();
const categoryCtrl = require("../controllers/category.controller");
const { adminMdlw } = require("../middlewares/admin.middleware");

// Public routes (no authentication required)
router.get("/", categoryCtrl.getAllCategories);
router.get("/:id", categoryCtrl.getCategoryById);

// Admin routes (protected routes)
router.use(adminMdlw); // Apply adminMdlw to all routes below this line

// Group all admin-only operations
router.route("/").post(categoryCtrl.createCategory);

router
	.route("/:id")
	.put(categoryCtrl.updateCategory)
	.delete(categoryCtrl.deleteCategory);

router.patch("/:id/toggle", categoryCtrl.toggleCategoryStatus);
module.exports = router;
