import express from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';
import { validateProduct } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', validateProduct, createProduct);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

export default router;