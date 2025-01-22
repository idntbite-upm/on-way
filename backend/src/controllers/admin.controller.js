// backend/src/controllers/admin.controller.js
const User = require("../models/user.model");
const AdminSession = require("../models/adminSession.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                message: "Email and password are required",
            });
        }

        // Find admin user
        const admin = await User.findOne({
            email,
            role: "ADMIN_ROLE",
            status: true,
        }).select("+password");

        if (!admin) {
            return res.status(401).json({
                ok: false,
                message: "Invalid credentials",
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                ok: false,
                message: "Invalid credentials",
            });
        }

        // Get client IP and user agent
        const clientIp =
            req.ip ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.headers["x-forwarded-for"]?.split(",")[0];

        const userAgent = req.headers["user-agent"];

        // Create or update session
        await AdminSession.findOneAndUpdate(
            { adminId: admin._id, ipAddress: clientIp },
            {
                adminId: admin._id,
                ipAddress: clientIp,
                userAgent,
                lastAccess: new Date(),
                isActive: true,
            },
            { upsert: true, new: true },
        );

        // Generate token
        const token = jwt.sign(
            {
                id: admin._id,
                role: admin.role,
                email: admin.email,
            },
            process.env.JWT_KEY || "secretKey",
            { expiresIn: "8h" },
        );

        const adminData = admin.toObject();
        delete adminData.password;

        return res.status(200).json({
            ok: true,
            data: {
                admin: adminData,
                token,
            },
        });
    } catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};

exports.testAdminAccess = async (req, res) => {
    try {
        // Since this is protected by the ipTrackingMiddleware,
        // if we reach here, the IP is verified and admin is authenticated
        return res.status(200).json({
            ok: true,
            message: "Admin access verified",
            data: {
                timestamp: new Date(),
                adminId: req.admin.id, // Assuming admin data is attached by auth middleware
                path: req.path,
            },
        });
    } catch (error) {
        console.error("Test admin access error:", error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
            redirect: "/",
        });
    }
};
