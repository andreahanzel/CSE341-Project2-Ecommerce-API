import express from 'express'; // Import the express library
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.js'; // Import the product controller functions
import { validateProduct } from '../middleware/validation.js'; // Import the validateProduct function

const router = express.Router(); // Create a new router

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve all products
 *     responses:
 *       200:
 *         description: A list of all products
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               brand:
 *                 type: string
 *               stock:
 *                 type: integer
 *               SKU:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product successfully created
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               brand:
 *                 type: string
 *               stock:
 *                 type: integer
 *               SKU:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product successfully updated
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       404:
 *         description: Product not found
 */


router.get('/', getAllProducts); // GET request for all products
router.get('/:id', getProductById); // GET request for a product by ID
router.post('/', validateProduct, createProduct); // POST request to create a product
router.put('/:id', validateProduct, updateProduct); // PUT request to update a product
router.delete('/:id', deleteProduct); // DELETE request to delete a product

export default router; // Export the router