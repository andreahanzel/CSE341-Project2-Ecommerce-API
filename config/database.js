// Purpose: To connect to the database
import mongoose from 'mongoose'; // Import mongoose
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load the .env file

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}; // Function to connect to the database

export default connectDB; // Export the function so it can be used in other files