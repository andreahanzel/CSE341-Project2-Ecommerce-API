import Category from '../models/category.js';
import { validationResult } from 'express-validator';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error: error.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid category ID format' });
        }
        res.status(500).json({ message: 'Error retrieving category', error: error.message });
    }
};

export const createCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const category = new Category(req.body);
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category name already exists' });
        }
        res.status(400).json({ message: 'Error creating category', error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid category ID format' });
        }
        res.status(400).json({ message: 'Error updating category', error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid category ID format' });
        }
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};