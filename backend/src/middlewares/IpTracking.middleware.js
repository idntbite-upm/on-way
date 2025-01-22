const jwt = require("jsonwebtoken");
const AdminSession = require("../models/adminSession.model");

exports.ipTrackingMiddleware = async (req, res, next) => {
	try {
		// Skip IP check for login route

		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res.status(401).json({
				ok: false,
				message: "Authentication required",
			});
		}

		// Get client IP and user agent
		const clientIp =
			req.ip ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.headers["x-forwarded-for"]?.split(",")[0];

		cosole.log(req.ip);

		const userAgent = req.headers["user-agent"];

		// Decode token to get admin ID
		const decoded = jwt.verify(token, process.env.JWT_KEY || "secretKey");
		const adminId = decoded.id;

		// Look for recent sessions from this admin
		const existingSessions = await AdminSession.find({
			adminId,
			isActive: true,
			lastAccess: {
				$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
			},
		});

		// Check if this IP has been used before
		const isKnownIP = existingSessions.find(
			(session) => session.ipAddress === clientIp,
		);

		if (!isKnownIP) {
			// Log suspicious access attempt
			console.warn(
				`Suspicious admin access attempt from IP: ${clientIp} for admin: ${adminId}`,
			);

			return res.status(403).json({
				ok: false,
				message: "Access denied: Unrecognized IP address",
				redirect: "/", // Frontend should handle this redirect
			});
		}

		// Update or create session
		await AdminSession.findOneAndUpdate(
			{ adminId, ipAddress: clientIp },
			{
				adminId,
				ipAddress: clientIp,
				userAgent,
				lastAccess: new Date(),
				isActive: true,
			},
			{ upsert: true, new: true },
		);

		next();
	} catch (error) {
		console.error("IP tracking middleware error:", error);
		return res.status(500).json({
			ok: false,
			message: "Internal server error",
			redirect: "/",
		});
	}
};
