const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarketplaceProductSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Product name required"],
			trim: true,
		},
		photo: {
			type: String,
			required: [true, "Photo required"],
		},
		price: {
			type: Number,
			required: [true, "Price required!"],
		},
		desc: {
			type: String,
			trim: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			required: [true, "Category is required"],
		},
		shop: {
			type: Schema.Types.ObjectId,
			ref: "Shop",
			required: true,
		},
		inStock: {
			type: Boolean,
			default: true,
		},
		quantity: {
			type: Number,
			required: [true, "Quantity required"],
			min: [0, "Quantity cannot be negative"],
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("MarketplaceProduct", MarketplaceProductSchema);
