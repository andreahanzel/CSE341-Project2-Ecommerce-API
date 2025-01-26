import express from 'express';
import { getAllProducts, createProduct } from '../controllers/products.js';
import { getAllCategories, createCategory } from '../controllers/categories.js';
import { validateProduct, validateCategory } from '../middleware/validation.js';

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - name
 *               - description
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of the item (products or categories)
 *                 enum:
 *                   - products
 *                   - categories
 *               name:
 *                 type: string
 *                 description: Name of the product or category
 *               price:
 *                 type: number
 *                 description: Price of the product (required for products)
 *               description:
 *                 type: string
 *                 description: Description of the product or category
 *               category:
 *                 type: string
 *                 description: Category of the product (required for products)
 *               brand:
 *                 type: string
 *                 description: Brand of the product
 *               stock:
 *                 type: integer
 *                 description: Stock quantity of the product
 *               SKU:
 *                 type: string
 *                 description: Stock-keeping unit identifier
 *               specifications:
 *                 type: object
 *                 description: Specifications of the product
 *                 properties:
 *                   processor:
 *                     type: string
 *                   ram:
 *                     type: string
 *                   storage:
 *                     type: string
 *               warranty:
 *                 type: string
 *                 description: Warranty period for the product
 *               inStock:
 *                 type: boolean
 *                 description: Whether the product is in stock
 *               isActive:
 *                 type: boolean
 *                 description: Whether the category is active
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Features of the category
 *               brands:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Brands associated with the category
 *     responses:
 *       201:
 *         description: Item successfully created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */

router.post('/', async (req, res) => {
    const { type, ...data } = req.body;

    try {
        if (type === 'products') {
            validateProduct(data); // Add validation for product data
            const product = await createProduct(data); // Call the createProduct controller
            return res.status(201).json(product); // Return the created product
        } else if (type === 'categories') {
            validateCategory(data); // Add validation for category data
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
