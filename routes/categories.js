import express from 'express'; // Import the express library
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categories.js'; // Import the category controller functions
import { validateCategory } from '../middleware/validation.js'; // Import the validateCategory function

const router = express.Router(); // Create a new router

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve all categories
 *     responses:
 *       200:
 *         description: A list of all categories
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               brands:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Category successfully created
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 *   put:
 *     summary: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               brands:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Category successfully updated
 *       404:
 *         description: Category not found
 *   delete:
 *     summary: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category successfully deleted
 *       404:
 *         description: Category not found
 */


router.get('/', getAllCategories); // GET request for all categories
router.get('/:id', getCategoryById); // GET request for a category by ID
router.post('/', validateCategory, createCategory); // POST request to create a category
router.put('/:id', validateCategory, updateCategory); // PUT request to update a category
router.delete('/:id', deleteCategory); // DELETE request to delete a category

export default router; // Export the router
