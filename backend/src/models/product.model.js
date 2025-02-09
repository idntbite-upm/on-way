const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name required!"],
			trim: true,
			unique: true,
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
		shop: {
			type: Schema.Types.ObjectId,
			ref: "Shop",
			required: true,
		},
	},
	{
		versionKey: false,
	},
);

module.exports = model("Product", ProductSchema);
