const express = require("express");
const cors = require("cors");
require("./db/database");

//settings
const app = express();
require("dotenv").config();
app.set("PORT", process.env.PORT || 3800);

//middlewares
app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "Accept"],
	}),
);

app.use(express.json());

//routes
app.get("/", (req, res) => res.send("hello"));
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/users", require("./routes/user.routes"));
app.use("/api/v1/products", require("./routes/product.routes"));
app.use("/api/v1/shops", require("./routes/shop.routes"));
app.use("/api/v1/categories", require("./routes/category.routes"));
app.use("/api/v1/marketproducts", require("./routes/marketproduct.routes"));
app.get("/test", (req, res) => {
	res.json({ message: "Server is running" });
});

// app.use("/api/v1/carts", require("./routes/cart.routes"));
// app.use("/api/v1/orders", require("./routes/order.routes"));
// app.use("/api/v1/coupons", require("./routes/coupon.routes"));
// app.use("/api/v1/history", require("./routes/history.routes"));
// app.use("/api/v1/address", require("./routes/address.routes"));

module.exports = app;
