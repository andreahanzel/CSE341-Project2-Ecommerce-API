// models/product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'],
        trim: true,
        minLength: [3, 'Product name must be at least 3 characters']
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'],
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
        required: [true, 'Stock is required'],
        min: [0, 'Stock cannot be negative']
    },
    SKU: { 
        type: String, 
        required: [true, 'SKU is required'],
        unique: true,
        trim: true,
        match: [/^[A-Za-z0-9-]+$/, 'SKU must contain only letters, numbers, and hyphens']
    },
    specifications: {
        type: Map,
        of: String
    },
    warranty: String,
    inStock: { 
        type: Boolean, 
        default: true 
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);