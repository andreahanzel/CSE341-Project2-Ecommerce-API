import mongoose from 'mongoose'; // Mongoose model Category

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
      trim: true
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    },
    features: {
      type: [String],
      default: []
    },
    brands: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
); // Mongoose model Category

const Category = mongoose.model('Category', categorySchema); // Mongoose model Category

export default Category; // Mongoose model Category
