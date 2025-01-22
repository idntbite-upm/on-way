const mongoose = require("mongoose");

const adminSessionSchema = new mongoose.Schema(
    {
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ipAddress: {
            type: String,
            required: true,
        },
        userAgent: {
            type: String,
            required: true,
        },
        lastAccess: {
            type: Date,
            default: Date.now,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("AdminSession", adminSessionSchema);
