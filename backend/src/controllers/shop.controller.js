const Shop = require("../models/shop.model");
const Product = require("../models/product.model");

// @desc        get all shops
// @route       GET /api/v1/shops
// @access      public
exports.getAllShops = async (req, res) => {
    const { sort } = req.query;

    try {
        let query = Shop.find();
        if (sort === "asc" || sort === "desc")
            query = Shop.find().sort({ price: sort });

        const prods = await query;

        return res.status(200).json({ ok: true, data: prods });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// @desc        get shop by id
// @route       GET /api/v1/shops/:id
// @access      public
exports.getShopById = async (req, res) => {
    const { id } = req.params;
    try {
        const prod = await Shop.findById(id);

        return res.status(200).json({ ok: true, data: prod });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// @desc        create shop
// @route       POST /api/v1/shops
// @access      private ADMIN
exports.createShop = async (req, res) => {
    try {
        const newShop = new Shop(req.body);
        await newShop.save();
        return res.status(201).json({ ok: true, data: newShop });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// @desc        update shop
// @route       PUT /api/v1/shops/:id
// @access      private ADMIN
exports.updateShop = async (req, res) => {
    const { id } = req.params;
    const { _id, ...rest } = req.body;
    try {
        const shop = await Shop.findById(id);
        if (!shop) {
            return res.status(404).json({ ok: false, msg: "Shop not found" });
        }
        const updatedShop = await Shop.findByIdAndUpdate(id, rest, { new: true });
        return res.status(200).json({ ok: true, data: updatedShop });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// @desc        delete shop
// @route       DELETE /api/v1/shops/:id
// @access      private ADMIN
exports.deleteShop = async (req, res) => {
    const { id } = req.params;
    try {
        const shop = await Shop.findById(id);
        if (!shop) {
            return res.status(404).json({ ok: false, msg: "Shop not found" });
        }
        await Shop.findByIdAndDelete(id);
        return res.status(200).json({ ok: true, data: { msg: "Shop deleted" } });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
