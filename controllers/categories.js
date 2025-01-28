import { connectToDatabase } from '../config/database.js';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// Define Mongoose schema and model
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required']
  },
  description: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  features: {
    type: [String]
  },
  brands: {
    type: [String]
  }
});

const Category = mongoose.model('Category', categorySchema);

// Get all categories
const getAll = async (req, res) => {
  //#swagger.tags = ['Categories']
  try {
    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('categories'); // Manually get the collection
    const categories = await collection.find().toArray(); // Fetch using native MongoDB
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error in getAll:', err);
    res.status(500).json({ message: 'Error fetching categories', error: err.toString() });
  }
};

// Get a single category
const getSingle = async (req, res) => {
  //#swagger.tags = ['Categories']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('categories'); // Manually get the collection
    const categoryId = new ObjectId(id);
    const category = await collection.findOne({ _id: categoryId }); // Fetch using native MongoDB

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(category);
  } catch (err) {
    console.error('Error in getSingle:', err);
    res.status(500).json({ message: 'Error fetching category', error: err.toString() });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  //#swagger.tags = ['Categories']
  try {
    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('categories'); // Manually get the collection

    // Use Mongoose for validation before inserting
    const newCategory = new Category(req.body);
    const validationError = newCategory.validateSync();

    if (validationError) {
      return res.status(400).json({ message: 'Validation failed', error: validationError.message });
    }

    const response = await collection.insertOne(req.body); // Insert using native MongoDB

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Failed to create category' });
    }
  } catch (err) {
    console.error('Error in createCategory:', err);
    res.status(500).json({ message: 'Error creating category', error: err.toString() });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  //#swagger.tags = ['Categories']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('categories'); // Manually get the collection
    const categoryId = new ObjectId(id);

    // Use Mongoose for validation before updating
    const updatedCategory = new Category(req.body);
    const validationError = updatedCategory.validateSync();

    if (validationError) {
      return res.status(400).json({ message: 'Validation failed', error: validationError.message });
    }

    const response = await collection.updateOne({ _id: categoryId }, { $set: req.body }); // Update using native MongoDB

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message:
        response.modifiedCount > 0
          ? 'Category updated successfully'
          : 'No changes were made to the category',
      modifiedCount: response.modifiedCount
    });
  } catch (err) {
    console.error('Error in updateCategory:', err);
    res.status(500).json({ message: 'Error updating category', error: err.toString() });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  //#swagger.tags = ['Categories']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('categories'); // Manually get the collection
    const categoryId = new ObjectId(id);
    const response = await collection.deleteOne({ _id: categoryId }); // Delete using native MongoDB

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    console.error('Error in deleteCategory:', err);
    res.status(500).json({ message: 'Error deleting category', error: err.toString() });
  }
};

export default {
  getAll,
  getSingle,
  createCategory,
  updateCategory,
  deleteCategory
}; // Exporting the functions as an object