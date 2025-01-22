const { Router } = require("express");
const router = Router();
const { authMdlw } = require("../middlewares/auth.middleware");
const { createOrder } = require("../controllers/order.controller");

router.route("/").post(createOrder);

router.post("/log-order", (req, res) => {
	console.log(req.body);
	res.sendStatus(202);
});

module.exports = router;
