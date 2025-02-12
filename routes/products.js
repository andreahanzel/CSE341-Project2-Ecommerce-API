import express from 'express'; // Router for product-related routes
import productsController from '../controllers/products.js'; // Controller for product-related logic
import { productValidationRules, validate } from '../middleware/validation.js'; // Validation rules and middleware
import BaseError from '../helpers/baseError.js'; // Error handling class
import { isAuthenticated } from '../middleware/authenticate.js';

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
 *    security:
 *      - githubAuth: [] 
 *     tags:
 *       - Products
 *     summary: Create a new product (requires authentication)
 *     description: Add a new product to the database. Requires GitHub authentication.
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
 *       401:
 *         description: Unauthorized - Authentication required
 */
router.get('/', productsController.getAll);
router.post('/', isAuthenticated, productValidationRules(), validate, productsController.createProduct);


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
 *    security:
 *      - githubAuth: [] 
 *     tags:
 *       - Products
 *     summary: Update a product by ID (requires authentication)
 *     description: Update a product's information using its unique ID. Requires GitHub authentication.
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
 *       401:
 *         description: Unauthorized - Authentication required
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 *   delete:
 *   security:
 *      - githubAuth: [] 
 *     tags:
 *       - Products
 *     summary: Delete a product by ID (requires authentication)
 *     description: Delete a product using its unique ID. Requires GitHub authentication.
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
 *      401:
 *         description: Unauthorized - Authentication required
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

router.put('/:id', isAuthenticated, productValidationRules(), validate, productsController.updateProduct);
router.delete('/:id', isAuthenticated, productsController.deleteProduct);


export default router;