import { connectToDatabase } from '../config/database.js'; // Use connectToDatabase
import { ObjectId } from 'mongodb'; // Use ObjectId
import mongoose from 'mongoose'; // Use mongoose

// Define Mongoose schema and model
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  brand: {
    type: String
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required']
  },
  SKU: {
    type: String,
    required: [true, 'SKU is required']
  },
  specifications: {
    type: Object
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema); // Mongoose model Product

// Get all products
const getAll = async (req, res) => {
  //#swagger.tags = ['Products']
  try {
    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('products'); // Manually get the collection
    const products = await collection.find().toArray(); // Fetch using native MongoDB
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(products);
  } catch (err) {
    console.error('Error in getAll:', err);
    res.status(500).json({ message: 'Error fetching products', error: err.toString() }); // Error handling
  }
};

// Get a single product
const getSingle = async (req, res) => {
  //#swagger.tags = ['Products']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('products'); // Manually get the collection
    const productId = new ObjectId(id);
    const product = await collection.findOne({ _id: productId }); // Fetch using native MongoDB

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(product);
  } catch (err) {
    console.error('Error in getSingle:', err);
    res.status(500).json({ message: 'Error fetching product', error: err.toString() });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  //#swagger.tags = ['Products']
  try {
    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('products'); // Manually get the collection

    // Use Mongoose for validation before inserting
    const newProduct = new Product(req.body);
    const validationError = newProduct.validateSync();

    if (validationError) {
      return res.status(400).json({ message: 'Validation failed', error: validationError.message });
    }

    const response = await collection.insertOne(req.body); // Insert using native MongoDB

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Failed to create product' });
    }
  } catch (err) {
    console.error('Error in createProduct:', err);
    res.status(500).json({ message: 'Error creating product', error: err.toString() });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  //#swagger.tags = ['Products']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('products'); // Manually get the collection
    const productId = new ObjectId(id);

    // Use Mongoose for validation before updating
    const updatedProduct = new Product(req.body);
    const validationError = updatedProduct.validateSync();

    if (validationError) {
      return res.status(400).json({ message: 'Validation failed', error: validationError.message });
    }

    const response = await collection.updateOne({ _id: productId }, { $set: req.body }); // Update using native MongoDB

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message:
        response.modifiedCount > 0
          ? 'Product updated successfully'
          : 'No changes were made to the product',
      modifiedCount: response.modifiedCount
    });
  } catch (err) {
    console.error('Error in updateProduct:', err);
    res.status(500).json({ message: 'Error updating product', error: err.toString() });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  //#swagger.tags = ['Products']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = await connectToDatabase(); // Use connectToDatabase
    const collection = db.collection('products'); // Manually get the collection
    const productId = new ObjectId(id);
    const response = await collection.deleteOne({ _id: productId }); // Delete using native MongoDB

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error('Error in deleteProduct:', err);
    res.status(500).json({ message: 'Error deleting product', error: err.toString() });
  }
};

export default {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct
}; // Exporting the functions