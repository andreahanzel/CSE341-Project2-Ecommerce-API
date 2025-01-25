import { body } from 'express-validator';

export const validateProduct = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('quantity').isInt({ min: 0 }).withMessage('Valid quantity is required')
];