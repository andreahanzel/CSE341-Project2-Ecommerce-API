import mongoose from 'mongoose'; // Mongoose model Product

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number']
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock must be a non-negative integer']
    },
    SKU: {
      type: String,
      required: [true, 'SKU is required'],
      trim: true,
      unique: true,
      match: [/^GL-\d{4}-\d{3}$/, 'Invalid SKU format. Must be like GL-2025-001']
    },
    specifications: {
      type: Object,
      default: {}
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
); // Mongoose model Product

const Product = mongoose.model('Product', productSchema); // Mongoose model Product

export default Product; // Mongoose model Product
