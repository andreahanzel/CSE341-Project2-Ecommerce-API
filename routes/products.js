import express from 'express'; // Router for product-related routes
import productsController from '../controllers/products.js'; // Controller for product-related logic
import { productValidationRules, validate } from '../middleware/validation.js'; // Validation rules and middleware
import BaseError from '../helpers/baseError.js'; // Error handling class

const router = express.Router(); // Router for product-related routes

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Internal Server Error
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     description: Add a new product to the database.
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
 *               - brand
 *               - stock
 *               - SKU
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
 *               specifications:
 *                 type: object
 *               inStock:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product created
 *       500:
 *         description: Internal Server Error
 */
router.get('/', productsController.getAll);
router.post('/', productValidationRules(), validate, productsController.createProduct);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a product by ID
 *     description: Retrieve a single product using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product by ID
 *     description: Update a product's information using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the product
 *         schema:
 *           type: string
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
 *               - brand
 *               - stock
 *               - SKU
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
 *               specifications:
 *                 type: object
 *               inStock:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by ID
 *     description: Delete a product using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', async (req, res, next) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BaseError('ValidationError', 400, true, 'Invalid product ID format');
    }
    await productsController.getSingle(req, res, next);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', productValidationRules(), validate, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;