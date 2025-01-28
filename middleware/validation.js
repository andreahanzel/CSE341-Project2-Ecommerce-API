import { body, validationResult } from 'express-validator'; // Validation rules for product and category

const productValidationRules = () => [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isString()
    .withMessage('Product name must be a string'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),

  body('description')
    .optional()
    .trim()
    .isString()
    .withMessage('Description must be a string'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isString()
    .withMessage('Category must be a string'),

  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Brand is required')
    .isString()
    .withMessage('Brand must be a string'),

  body('stock')
    .notEmpty()
    .withMessage('Stock quantity is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),

    body('SKU')
    .trim()
    .notEmpty()
    .withMessage('SKU is required')
    .isString()
    .withMessage('SKU must be a string')
    .matches(/^GL-\d{4}-\d{3}$/)
    .withMessage('SKU must follow the format: GL-YYYY-NNN (e.g., GL-2025-001)'),


  body('specifications')
    .optional()
    .isObject()
    .withMessage('Specifications must be an object'),

  body('inStock')
    .optional()
    .isBoolean()
    .withMessage('InStock must be a boolean')
]; //Validation rules for product

const categoryValidationRules = () => [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isString()
    .withMessage('Category name must be a string'),

  body('description')
    .optional()
    .trim()
    .isString()
    .withMessage('Description must be a string'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

  body('parentCategory')
    .optional()
    .isString()
    .withMessage('Parent category must be a string or null'),

  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array of strings')
    .custom((features) => features.every((feature) => typeof feature === 'string'))
    .withMessage('Each feature must be a string'),

  body('brands')
    .optional()
    .isArray()
    .withMessage('Brands must be an array of strings')
    .custom((brands) => brands.every((brand) => typeof brand === 'string'))
    .withMessage('Each brand must be a string')
]; //Validation rules for category

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    [err.path]: err.msg
  }));

  return res.status(400).json({
    success: false,
    errors: extractedErrors
  });
}; //Middleware to validate request data

export { productValidationRules, categoryValidationRules, validate }; //Export validation rules and middleware
