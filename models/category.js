import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Category name is required'],
        trim: true,
        unique: true
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'],
        trim: true 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    features: [String],
    brands: [String],
    parentCategory: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model('Category', categorySchema);