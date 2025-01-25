import { body } from 'express-validator'; // Import the body function from express-validator

export const validateProduct = [
    body('name').trim().notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('description').trim().notEmpty(),
    body('category').trim().notEmpty(),
    body('brand').trim().notEmpty(),
    body('stock').isInt({ min: 0 }),
    body('SKU').trim().notEmpty()
]; // Validation chain for product

export const validateCategory = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('isActive').isBoolean().withMessage('isActive must be boolean')
]; // Validation chain for category