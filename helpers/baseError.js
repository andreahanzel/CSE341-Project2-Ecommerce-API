export class BaseError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends BaseError {
    constructor(message) {
        super(message || 'Resource not found', 404);
    }
}

export class ValidationError extends BaseError {
    constructor(message) {
        super(message || 'Validation failed', 400);
    }
}

export class DuplicateError extends BaseError {
    constructor(message) {
        super(message || 'Duplicate entry', 400);
    }
}