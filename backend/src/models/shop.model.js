const { Schema, model } = require("mongoose");

const ShopSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name required!"],
			trim: true,
			unique: true,
		},
		openingTime: {
			type: String,
			required: true,
		},
		closingTime: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 0,
			max: 5,
		},
		orderCount: {
			type: Number,
			required: true,
		},
		isOpen: {
			type: Boolean,
			required: true,
		},
		location: {
			type: String,
			required: [true, "Location required!"],
		},
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
		],
	},
	{
		versionKey: false,
	},
);

module.exports = model("Shop", ShopSchema);
