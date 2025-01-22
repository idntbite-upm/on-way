// backend/src/middlewares/admin.middleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

/**
 * Middleware to verify admin authentication and authorization
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.adminMdlw = async (req, res, next) => {
    try {
        // Check if authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                ok: false,
                message: "No token provided",
            });
        }

        // Extract token
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : authHeader;

        if (!token) {
            return res.status(401).json({
                ok: false,
                message: "Authentication failed: No token provided",
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_KEY || "secretKey");

            // Check if token is expired
            if (decoded.exp && decoded.exp < Date.now() / 1000) {
                return res.status(401).json({
                    ok: false,
                    message: "Token has expired",
                });
            }

            // Find user and check if still exists and is active
            const user = await User.findOne({
                _id: decoded.id,
                status: true,
            }).select("-password");

            if (!user) {
                return res.status(404).json({
                    ok: false,
                    message: "User not found or inactive",
                });
            }

            // Verify if user is admin
            if (user.role !== "ADMIN_ROLE") {
                return res.status(403).json({
                    ok: false,
                    message: "Access denied: Admin privileges required",
                });
            }

            // Add user to request object
            req.user = user;
            next();
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({
                    ok: false,
                    message: "Invalid token",
                });
            }
            throw error;
        }
    } catch (error) {
        console.error("Admin middleware error:", error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};

// Rate limiting middleware
const rateLimit = require("express-rate-limit");

exports.adminRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        ok: false,
        message: "Too many requests from this IP, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
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

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                ok: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: admin.role,
                email: admin.email,
            },
            process.env.JWT_KEY || "secretKey",
            { expiresIn: "8h" },
        );

        res.status(200).json({
            ok: true,
            data: {
                id: admin._id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
                token,
            },
        });
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};
