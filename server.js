import express from 'express'; // Import the express library
import dotenv from 'dotenv'; // Import the dotenv library
import cors from 'cors'; // Import the cors library
import swaggerUi from 'swagger-ui-express'; // Import the swagger-ui-express library
import fs from 'fs'; // Import the fs library
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import { dirname } from 'path'; // Import the dirname function
import connectDB from './config/database.js'; // Import the connectDB function
import productRoutes from './routes/products.js'; // Import the productRoutes
import categoryRoutes from './routes/categories.js'; // Import the categoryRoutes
import generalRoutes from './routes/general.js'; // Import the generalRoutes
import { errorHandler } from './middleware/errorHandler.js'; // Import the errorHandler middleware

const __filename = fileURLToPath(import.meta.url); // Get the filename of the current module
const __dirname = dirname(__filename); // Get the directory name of the current module
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger_output.json', 'utf8')); // Read the swagger_output.json file

dotenv.config(); // Load environment variables
const app = express(); // Create an express application

connectDB(); // Connect to the database

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable JSON body parsing

// Serve the welcome message on "/"
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to E-commerce API' }); // Ensure only the welcome message is displayed
});

// Attach general routes for /api
app.use('/api', generalRoutes);

// Attach product and category routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Serve Swagger UI on "/api-docs"
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server on port 3000
