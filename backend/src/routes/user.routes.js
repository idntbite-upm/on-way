const { Router } = require("express");
const router = Router();
const { adminMdlw } = require("../middlewares/admin.middleware");
const userCtrl = require("../controllers/user.controller");

// Protected routes with authentication
router.route("/current").get(userCtrl.getCurrentUser);

router.use(adminMdlw); // Apply authMdlw to all routes below this line

router.route("/").get(userCtrl.getAllUsers);

router
	.route("/:id")
	.get(userCtrl.getUserById)
	.put(userCtrl.editUser)
	.delete(userCtrl.deleteUser);

module.exports = router;
