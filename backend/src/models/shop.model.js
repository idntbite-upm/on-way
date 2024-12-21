const { Schema, model } = require("mongoose");

const ShopSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Name required!"],
            trim: true,
            unique: true,
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
