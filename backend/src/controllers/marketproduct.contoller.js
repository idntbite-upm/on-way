const MarketplaceProduct = require("../models/marketproduct.model");
const Category = require("../models/category.model");

// Get all marketplace products
exports.getAllMarketProducts = async (req, res) => {
	const { sort, category } = req.query;

	try {
		let query = MarketplaceProduct.find();

		if (category) {
			query = query.where("category").equals(category);
		}

		if (sort === "asc" || sort === "desc") {
			query = query.sort({ price: sort });
		}

		const products = await query.populate("category");
		return res.status(200).json({ ok: true, data: products });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

// Get products by category

exports.getProductsByCategory = async (req, res) => {
	const { categoryId } = req.params;
	console.log("Collection name:", MarketplaceProduct.collection.name);

	try {
		const query = {
			category: categoryId,
			inStock: true,
		};

		const products = await MarketplaceProduct.find(query)
			.populate("category")
			.lean()
			.exec();

		console.log(`Found ${products.length} products for category ${categoryId}`);

		return res.status(200).json({
			ok: true,
			count: products.length,
			data: products,
		});
	} catch (error) {
		console.log("Error:", error.message);
		return res.status(500).json({
			ok: false,
			error: error.message,
		});
	}
};

// Get product by ID
exports.getMarketProductById = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await MarketplaceProduct.findById(id).populate("category");
		return res.status(200).json({ ok: true, data: product });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

// Create new market product
exports.createMarketProduct = async (req, res) => {
	try {
		const newProduct = new MarketplaceProduct(req.body);
		await newProduct.save();
		return res.status(201).json({ ok: true, data: newProduct });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

// Update market product
exports.updateMarketProduct = async (req, res) => {
	const { _id, ...rest } = req.body;
	const { id } = req.params;
	try {
		const product = await MarketplaceProduct.findById(id);
		if (!product) {
			return res.status(404).json({ ok: false, msg: "Product not found" });
		}

		const updatedProduct = await MarketplaceProduct.findByIdAndUpdate(
			id,
			rest,
			{ new: true },
		).populate("category");

		return res.status(200).json({ ok: true, data: updatedProduct });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

// Delete market product
exports.deleteMarketProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await MarketplaceProduct.findById(id);
		if (!product) {
			return res.status(404).json({ ok: false, msg: "Product not found" });
		}

		const deletedProduct = await MarketplaceProduct.findByIdAndDelete(id);
		return res.status(200).json({ ok: true, data: deletedProduct });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
