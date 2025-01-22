// backend/src/server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const initializeSocket = require("./config/socket.config");
require("dotenv").config();
require("./db/database");
require("dotenv").config();
require("./db/database");

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

app.set("io", io);

// Environment variables
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3800;
const ALLOWED_ORIGINS = ["http://localhost:3000"];

// Middleware
app.use(helmet()); // Adds security headers
app.use(
	cors({
		origin: ALLOWED_ORIGINS,
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "Accept"],
	}),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // Logging middleware

// API Routes Configuration
const API_VERSION = "/api/v1";

// Routes
const routes = {
	auth: require("./routes/auth.routes"),
	users: require("./routes/user.routes"),
	products: require("./routes/product.routes"),
	shops: require("./routes/shop.routes"),
	categories: require("./routes/category.routes"),
	marketproducts: require("./routes/marketproduct.routes"),
	admin: require("./routes/admin.routes"),
	trackings: require("./routes/orderTracking.routes"),
	orders: require("./routes/order.routes"),
};

// Mount Routes
app.use(`${API_VERSION}/auth`, routes.auth);
app.use(`${API_VERSION}/users`, routes.users);
app.use(`${API_VERSION}/products`, routes.products);
app.use(`${API_VERSION}/shops`, routes.shops);
app.use(`${API_VERSION}/categories`, routes.categories);
app.use(`${API_VERSION}/marketproducts`, routes.marketproducts);
app.use(`${API_VERSION}/admin`, routes.admin);
app.use(`${API_VERSION}/trackings`, routes.trackings);
app.use(`${API_VERSION}/orders`, routes.orders);

// Health Check Routes
app.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "Welcome to On-Way API",
	});
});

app.get("/health", (req, res) => {
	res.status(200).json({
		status: "healthy",
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	});
});

app.get("/api/token", (req, res) => {
	const guestToken = `guest_${Date.now()}`;
	res.json({ token: guestToken });
});

// Future Routes
/*
app.use(`${API_VERSION}/carts`, require("./routes/cart.routes"));
app.use(`${API_VERSION}/orders`, require("./routes/order.routes"));
app.use(`${API_VERSION}/coupons`, require("./routes/coupon.routes"));
app.use(`${API_VERSION}/history`, require("./routes/history.routes"));
app.use(`${API_VERSION}/address`, require("./routes/address.routes"));
*/

// 404 Handler
app.use((req, res) => {
	res.status(404).json({
		status: "error",
		message: "Resource not found",
	});
});

// Error Handler
app.use((err, req, res, next) => {
	console.error(`Error: ${err.message}`);

	const status = err.status || 500;
	const message =
		NODE_ENV === "development" ? err.message : "Internal server error";

	res.status(status).json({
		status: "error",
		message,
		...(NODE_ENV === "development" && { stack: err.stack }),
	});
});

module.exports = { app, server };
