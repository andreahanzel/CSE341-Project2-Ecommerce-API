// routes/categories.js
import express from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categories.js';
import { validateCategory } from '../middleware/validation.js';

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of all categories
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Bad Request
 * 
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Category name
 *           example: "Gaming"
 *         description:
 *           type: string
 *           description: Category description
 *           example: "Gaming devices and accessories"
 *         isActive:
 *           type: boolean
 *           description: Category status
 *           example: true
 *         features:
 *           type: array
 *           items:
 *             type: string
 *           description: Category features
 *           example: ["Performance", "Graphics", "Storage"]
 *         brands:
 *           type: array
 *           items:
 *             type: string
 *           description: Associated brands
 *           example: ["Razer", "Alienware", "MSI"]
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Update a category
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Bad Request
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 */

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', validateCategory, createCategory);
router.put('/:id', validateCategory, updateCategory);
router.delete('/:id', deleteCategory);

export default router;
