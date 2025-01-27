// server.js update
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/database.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import generalRoutes from './routes/general.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger_output.json', 'utf8'));

dotenv.config();
const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to E-commerce API' });
});

// API routes
app.use('/api', generalRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
        docExpansion: 'none',
        persistAuthorization: true
    }
}));

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));