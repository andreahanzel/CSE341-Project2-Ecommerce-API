import express from 'express';
import { getAllProducts } from '../controllers/products.js';
import { getAllCategories } from '../controllers/categories.js';

const router = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     tags: [General]
 *     summary: Get all items from a specified collection
 *     parameters:
 *       - in: query
 *         name: collection
 *         required: true
 *         schema:
 *           type: string
 *           enum: [products, categories]
 *         description: Collection name to retrieve (products or categories)
 *         example: products
 *     responses:
 *       200:
 *         description: Successfully retrieved collection items
 *       400:
 *         description: Invalid collection parameter
 */
router.get('/', async (req, res) => {
    const { collection } = req.query;
    try {
        if (collection === 'products') {
            return getAllProducts(req, res);
        } else if (collection === 'categories') {
            return getAllCategories(req, res);
        } else {
            return res.status(400).json({ 
                error: 'Invalid collection parameter. Use "products" or "categories".' 
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;