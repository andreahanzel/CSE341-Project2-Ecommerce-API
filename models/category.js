import mongoose from 'mongoose'; // Import mongoose

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    features: [String],
    brands: [String]
}, {
    timestamps: true
}); // Create a category schema

export default mongoose.model('Category', categorySchema); // Export the Category model