import express from 'express';
import productsRouter from './products.js';
import categoriesRouter from './categories.js';
import swaggerRouter from './swagger.js';

const router = express.Router();

// Mount the Swagger router
router.use('/', swaggerRouter);
// Mount the products router at /products
router.use('/products', productsRouter);
// Mount the categories router at /categories
router.use('/categories', categoriesRouter);

// Add a root route for testing
router.get('/', (req, res) => {
  //#swagger.tags = ['Hello World']
  res.send('Hello, World!');
});

// Export the main router
export default router;