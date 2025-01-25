import express from 'express';
import { getAllProducts } from '../controllers/products.js';
import { getAllCategories } from '../controllers/categories.js';

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
});

export default router;
