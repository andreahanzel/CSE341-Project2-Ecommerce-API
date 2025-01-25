import mongoose from 'mongoose'; // Import mongoose

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    SKU: { type: String, required: true },
    specifications: {
        type: Map,
        of: String
    },
    warranty: String,
    inStock: { type: Boolean, default: true }
}, {
    timestamps: true
}); // Create a product schema

export default mongoose.model('Product', productSchema); // Export the Product model