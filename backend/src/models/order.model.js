const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
	{
		orderId: {
			type: String,
			required: true,
			unique: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: false,
		},
		items: [
			{
				product: {
					type: Schema.Types.ObjectId,
					refPath: "productType",
					required: true,
				},
				productType: {
					type: String,
					required: true,
					enum: ["Product", "MarketplaceProduct"],
				},
				quantity: {
					type: Number,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
			},
		],
		total: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "processing", "delivered", "cancelled"],
			default: "pending",
		},
		shippingAddress: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = model("OrderSub", OrderSchema);
