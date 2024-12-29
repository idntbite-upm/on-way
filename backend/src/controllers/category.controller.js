const Category = require('../models/category.model');

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true });
        return res.status(200).json({ ok: true, data: categories });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ ok: false, msg: 'Category not found' });
        }
        return res.status(200).json({ ok: true, data: category });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// Create category
exports.createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        return res.status(201).json({ ok: true, data: newCategory });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                ok: false, 
                msg: 'Category name already exists' 
            });
        }
        console.log(error);
        return res.status(500).json(error);
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    const { _id, ...rest } = req.body;
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ ok: false, msg: 'Category not found' });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            rest,
            { new: true }
        );
        return res.status(200).json({ ok: true, data: updatedCategory });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                ok: false, 
                msg: 'Category name already exists' 
            });
        }
        console.log(error);
        return res.status(500).json(error);
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ ok: false, msg: 'Category not found' });
        }

        const deletedCategory = await Category.findByIdAndDelete(id);
        return res.status(200).json({ ok: true, data: deletedCategory });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// Toggle category status
exports.toggleCategoryStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ ok: false, msg: 'Category not found' });
        }

        category.isActive = !category.isActive;
        await category.save();
        
        return res.status(200).json({ ok: true, data: category });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};