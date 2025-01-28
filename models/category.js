import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true
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
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
