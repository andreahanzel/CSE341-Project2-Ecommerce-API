import express from 'express'; // Main router for the application
import productsRouter from './products.js'; // Router for product-related routes
import categoriesRouter from './categories.js'; // Router for category-related routes
import swaggerRouter from './swagger.js'; // Router for Swagger documentation
import passport from 'passport';

const router = express.Router();

// Mount the Swagger router
router.use('/', swaggerRouter);
// Mount the products router at /products
router.use('/products', productsRouter);
// Mount the categories router at /categories
router.use('/categories', categoriesRouter);


// Add GitHub authentication routes
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// Add a root route for testing
router.get('/', (req, res) => {
  //#swagger.tags = ['Hello World']
  res.send('Hello, World!');
});

// Export the main router
export default router;