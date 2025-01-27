import { body } from 'express-validator';

export const validateProduct = [
   body('name')
       .trim()
       .notEmpty()
       .withMessage('Product name is required')
       .isLength({ min: 3 })
       .withMessage('Product name must be at least 3 characters long'),
   body('price')
       .isFloat({ min: 0 })
       .withMessage('Price must be a positive number'),
   body('description')
       .trim()
       .notEmpty()
       .withMessage('Description is required'),
   body('category')
       .trim()
       .notEmpty()
       .withMessage('Category is required'),
   body('brand')
       .trim()
       .notEmpty()
       .withMessage('Brand is required'),
   body('stock')
       .isInt({ min: 0 })
       .withMessage('Stock must be a positive integer'),
   body('SKU')
       .trim()
       .notEmpty()
       .withMessage('SKU is required')
       .matches(/^[A-Za-z0-9-]+$/)
       .withMessage('SKU must contain only letters, numbers, and hyphens'),
   body('specifications')
       .optional()
       .custom(value => {
           if (value && typeof value === 'object') {
               return Object.values(value).every(val => typeof val === 'string');
           }
           return true;
       })
       .withMessage('Specifications must be a map of strings'),
   body('warranty')
       .optional()
       .isString()
       .withMessage('Warranty must be a string'),
   body('inStock')
       .optional()
       .isBoolean()
       .withMessage('inStock must be a boolean')
];

export const validateCategory = [
   body('name')
       .trim()
       .notEmpty()
       .withMessage('Category name is required')
       .isLength({ min: 2 })
       .withMessage('Category name must be at least 2 characters long'),
   body('description')
       .trim()
       .notEmpty()
       .withMessage('Description is required'),
   body('isActive')
       .optional()
       .isBoolean()
       .withMessage('isActive must be a boolean'),
   body('features')
       .optional()
       .isArray()
       .withMessage('Features must be an array'),
   body('brands')
       .optional()
       .isArray()
       .withMessage('Brands must be an array'),
   body('parentCategory')
       .optional()
       .isMongoId()
       .withMessage('Invalid parent category ID')
];