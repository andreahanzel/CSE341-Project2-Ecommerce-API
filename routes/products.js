import express from 'express'; // Import the express library
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.js'; // Import the product controller functions
import { validateProduct } from '../middleware/validation.js'; // Import the validateProduct function

const router = express.Router(); // Create a new router

router.get('/', getAllProducts); // GET request for all products
router.get('/:id', getProductById); // GET request for a product by ID
router.post('/', validateProduct, createProduct); // POST request to create a product
router.put('/:id', validateProduct, updateProduct); // PUT request to update a product
router.delete('/:id', deleteProduct); // DELETE request to delete a product

export default router; // Export the router