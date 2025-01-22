const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.authMdlw = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                ok: false,
                message: "No authorization token provided",
            });
        }

        // Extract token
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_KEY || "secretKey");

        // Find user
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(401).json({
                ok: false,
                message: "User not found",
            });
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                ok: false,
                message: "Invalid token",
            });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                ok: false,
                message: "Token expired",
            });
        }
        return res.status(500).json({
            ok: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// Optional: Role-based middleware
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                ok: false,
                message: "Not authorized to access this route",
            });
        }
        next();
    };
};
