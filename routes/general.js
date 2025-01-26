import express from 'express';
import { getAllProducts, createProduct } from '../controllers/products.js';
import { getAllCategories, createCategory } from '../controllers/categories.js';

const router = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Retrieve products or categories
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         description: Choose either "products" or "categories"
 *         schema:
 *           type: string
 *           enum:
 *             - products
 *             - categories
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Invalid type parameter
 */
router.get('/', async (req, res) => {
    const { type } = req.query;

    try {
        if (type === 'products') {
            const products = await getAllProducts(req, res, true); // Call the products controller
            return res.json(products); // Return the products in the response
        } else if (type === 'categories') {
            const categories = await getAllCategories(req, res, true); // Call the categories controller
            return res.json(categories); // Return the categories in the response
        } else {
            return res.status(400).json({ error: 'Invalid type parameter. Choose "products" or "categories".' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); // GET products or categories

/**
 * @swagger
 * /api:
 *   post:
 *     summary: Create a new product or category
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         description: Specify the type of item to create (e.g., products or categories)
 *         schema:
 *           type: string
 *           enum:
 *             - products
 *             - categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 required:
 *                   - name
 *                   - price
 *                   - category
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the product
 *                   price:
 *                     type: number
 *                     description: Price of the product
 *                   description:
 *                     type: string
 *                   category:
 *                     type: string
 *                   brand:
 *                     type: string
 *                   stock:
 *                     type: integer
 *                   SKU:
 *                     type: string
 *                   specifications:
 *                     type: object
 *                     properties:
 *                       processor:
 *                         type: string
 *                       ram:
 *                         type: string
 *                       storage:
 *                         type: string
 *                   warranty:
 *                     type: string
 *                   inStock:
 *                     type: boolean
 *               - type: object
 *                 required:
 *                   - name
 *                   - description
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   isActive:
 *                     type: boolean
 *                   features:
 *                     type: array
 *                     items:
 *                       type: string
 *                   brands:
 *                     type: array
 *                     items:
 *                       type: string
 *     responses:
 *       201:
 *         description: Item successfully created
 *       400:
 *         description: Invalid type parameter or invalid input
 *       500:
 *         description: Internal server error
 */

router.post('/', async (req, res) => {
    const { type } = req.query;
    const data = req.body;

    try {
        if (type === 'products') {
            const product = await createProduct(data); // Call the createProduct controller
            return res.status(201).json(product); // Return the created product
        } else if (type === 'categories') {
            const category = await createCategory(data); // Call the createCategory controller
            return res.status(201).json(category); // Return the created category
        } else {
            return res.status(400).json({ error: 'Invalid type parameter. Choose "products" or "categories".' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});  // POST product or category

export default router;
