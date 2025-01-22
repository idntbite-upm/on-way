const { app, server } = require("./server");

const PORT = process.env.PORT || 3800;

const server1 = server.listen(PORT, () => {
	console.log(`
    🚀 Server is running in ${process.env.NODE_ENV || "development"} mode
    🔊 Listening on port ${PORT}
    📚 API Documentation: ${process.env.API_DOCS_URL || "http://localhost:5000/api-docs"}
    `);
});

// Graceful shutdown handling
const shutdown = () => {
	console.log("Received kill signal, shutting down gracefully");
	server1.close(() => {
		console.log("Closed out remaining connections");
		process.exit(0);
	});

	setTimeout(() => {
		console.error(
			"Could not close connections in time, forcefully shutting down",
		);
		process.exit(1);
	}, 10000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
	console.error("UNHANDLED REJECTION! 💥 Shutting down...");
	console.error(err.name, err.message);
	server1.close(() => {
		process.exit(1);
	});
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
	console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
	console.error(err.name, err.message);
	process.exit(1);
});
