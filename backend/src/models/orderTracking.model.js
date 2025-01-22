const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "PICKED_UP", "IN_TRANSIT", "DELIVERED"],
        default: "PENDING",
    },
    location: {
        lat: Number,
        lng: Number,
        updatedAt: Date,
    },
    trackingHistory: [
        {
            location: {
                lat: Number,
                lng: Number,
            },
            status: String,
            timestamp: Date,
        },
    ],
});

module.exports = mongoose.model("Order", orderSchema);
