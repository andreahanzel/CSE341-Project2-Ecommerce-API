import express from 'express'; // Import the express library
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categories.js'; // Import the category controller functions
import { validateCategory } from '../middleware/validation.js'; // Import the validateCategory function

const router = express.Router(); // Create a new router

router.get('/', getAllCategories); // GET request for all categories
router.get('/:id', getCategoryById); // GET request for a category by ID
router.post('/', validateCategory, createCategory); // POST request to create a category
router.put('/:id', validateCategory, updateCategory); // PUT request to update a category
router.delete('/:id', deleteCategory); // DELETE request to delete a category

export default router; // Export the router
