// routes/products.js 
import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';
import { validateProduct } from '../middleware/validation.js';

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of all products
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Bad Request
 * 
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *         - category
 *         - brand
 *         - stock
 *         - SKU
 *       properties:
 *         name:
 *           type: string
 *           description: Product name
 *           example: "Gaming Laptop"
 *         price:
 *           type: number
 *           description: Product price
 *           example: 1299.99
 *         description:
 *           type: string
 *           description: Product description
 *           example: "High-performance gaming laptop"
 *         category:
 *           type: string
 *           description: Product category
 *           example: "Laptops"
 *         brand:
 *           type: string
 *           description: Product brand
 *           example: "Dell"
 *         stock:
 *           type: integer
 *           description: Stock quantity
 *           example: 50
 *         SKU:
 *           type: string
 *           description: Unique SKU identifier
 *           example: "GL-2024-001"
 *         specifications:
 *           type: object
 *           description: Product specifications
 *           example:
 *             processor: "Intel i9"
 *             ram: "32GB"
 *             storage: "1TB SSD"
 *         warranty:
 *           type: string
 *           description: Warranty information
 *           example: "2 years"
 *         inStock:
 *           type: boolean
 *           description: Stock availability
 *           example: true
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *       400:
 *         description: Bad Request
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validateProduct, createProduct);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
