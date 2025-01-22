// backend/scripts/manageAdminIPs.js
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const readline = require("readline");
const AdminSession = require("../src/models/adminSession.model");
const User = require("../src/models/user.model"); // Make sure you have User model imported

// Create readline interface for CLI
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

CONNECT_STRING =
	"mongodb+srv://myAtlasDBUser:NTB3KNCHDKN7WIK@myatlasclusteredu.oicbs.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU";

// Connect to MongoDB
async function connectDB() {
	try {
		await mongoose.connect(CONNECT_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		console.log("MongoDB connected successfully!");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
}

async function getAdminUsers() {
	try {
		// Adjust the query based on your User model structure
		return await User.find({ role: "ADMIN_ROLE" });
	} catch (error) {
		console.error("Error fetching admin users:", error);
		return [];
	}
}

// Add new admin session
async function addAdminSession(adminId, ipAddress, userAgent) {
	try {
		const existingSession = await AdminSession.findOne({
			adminId,
			ipAddress,
			userAgent,
		});

		if (existingSession) {
			console.log("\nThis session configuration already exists!");
			return;
		}

		await AdminSession.create({
			adminId,
			ipAddress,
			userAgent,
			isActive: true,
			lastAccess: new Date(),
		});
		console.log("\nAdmin session added successfully!");
	} catch (error) {
		console.error("Error adding admin session:", error);
	}
}

// Remove admin session
async function removeAdminSession(sessionId) {
	try {
		const result = await AdminSession.deleteOne({ _id: sessionId });
		if (result.deletedCount > 0) {
			console.log("\nAdmin session removed successfully!");
		} else {
			console.log("\nSession not found in database");
		}
	} catch (error) {
		console.error("Error removing admin session:", error);
	}
}

// List all admin sessions
async function listAdminSessions() {
	try {
		const sessions = await AdminSession.find({})
			.populate("adminId", "username email") // Adjust fields based on your User model
			.sort({ lastAccess: -1 });

		if (sessions.length === 0) {
			console.log("\nNo admin sessions found in database");
			return;
		}

		console.log("\nCurrent Admin Sessions:");
		console.log("----------------------");
		sessions.forEach((session, index) => {
			console.log(`${index + 1}. Session ID: ${session._id}`);
			console.log(
				`   Admin: ${session.adminId.username || session.adminId.email}`,
			);
			console.log(`   IP Address: ${session.ipAddress}`);
			console.log(`   User Agent: ${session.userAgent}`);
			console.log(`   Active: ${session.isActive}`);
			console.log(`   Last Access: ${session.lastAccess}`);
			console.log(`   Created At: ${session.createdAt}`);
			console.log("----------------------");
		});
	} catch (error) {
		console.error("Error listing admin sessions:", error);
	}
}

// Update admin session status
async function updateSessionStatus(sessionId, isActive) {
	try {
		const result = await AdminSession.updateOne(
			{ _id: sessionId },
			{
				isActive,
				lastAccess: new Date(),
			},
		);
		if (result.modifiedCount > 0) {
			console.log("\nAdmin session status updated successfully!");
		} else {
			console.log("\nSession not found in database");
		}
	} catch (error) {
		console.error("Error updating admin session:", error);
	}
}

// Main menu function
async function showMenu() {
	console.log("\nAdmin Session Management");
	console.log("1. Add new admin session");
	console.log("2. Remove admin session");
	console.log("3. List all admin sessions");
	console.log("4. Update session status");
	console.log("5. Exit");

	rl.question("\nSelect an option (1-5): ", async (answer) => {
		switch (answer) {
			case "1":
				const admins = await getAdminUsers();
				if (admins.length === 0) {
					console.log("\nNo admin users found in the database!");
					showMenu();
					return;
				}

				console.log("\nAvailable Admin Users:");
				admins.forEach((admin, index) => {
					console.log(`${index + 1}. ${admin.username || admin.email}`);
				});

				rl.question("\nSelect admin number: ", (adminIndex) => {
					const selectedAdmin = admins[parseInt(adminIndex) - 1];
					if (!selectedAdmin) {
						console.log("Invalid admin selection!");
						showMenu();
						return;
					}

					rl.question("Enter IP address: ", (ipAddress) => {
						rl.question("Enter User Agent: ", async (userAgent) => {
							await addAdminSession(selectedAdmin._id, ipAddress, userAgent);
							showMenu();
						});
					});
				});
				break;

			case "2":
				await listAdminSessions();
				rl.question("Enter Session ID to remove: ", async (sessionId) => {
					await removeAdminSession(sessionId);
					showMenu();
				});
				break;

			case "3":
				await listAdminSessions();
				showMenu();
				break;

			case "4":
				await listAdminSessions();
				rl.question("Enter Session ID to update: ", (sessionId) => {
					rl.question("Set active (true/false): ", async (status) => {
						const isActive = status.toLowerCase() === "true";
						await updateSessionStatus(sessionId, isActive);
						showMenu();
					});
				});
				break;

			case "5":
				console.log("Goodbye!");
				rl.close();
				mongoose.connection.close();
				process.exit(0);
				break;

			default:
				console.log("Invalid option!");
				showMenu();
				break;
		}
	});
}

// Start the script
async function start() {
	await connectDB();
	showMenu();
}

start();
