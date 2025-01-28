import express from 'express';
import categoriesController from '../controllers/categories.js';
import { categoryValidationRules, validate } from '../middleware/validation.js';
import BaseError from '../helpers/baseError.js';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Retrieve all categories
 *     description: Retrieve a list of all categories.
 *     responses:
 *       200:
 *         description: A list of categories
 *       500:
 *         description: Internal Server Error
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Add a new category to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               parentCategory:
 *                 type: string
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
 *         description: Category created
 *       500:
 *         description: Internal Server Error
 */
router.get('/', categoriesController.getAll);
router.post('/', categoryValidationRules(), validate, categoriesController.createCategory);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Retrieve a category by ID
 *     description: Retrieve a single category using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single category
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update a category by ID
 *     description: Update a category's information using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the category
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               parentCategory:
 *                 type: string
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
 *         description: Category updated
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category by ID
 *     description: Delete a category using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', async (req, res, next) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BaseError('ValidationError', 400, true, 'Invalid category ID format');
    }
    await categoriesController.getSingle(req, res, next);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', categoryValidationRules(), validate, categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

export default router;
