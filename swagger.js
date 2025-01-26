import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'E-commerce API',
        description: 'API for managing e-commerce products and categories',
    },
    host: 'cse341-ecommerce-api.onrender.com',
    basePath: '/api',
    schemes: ['https'],
    components: {
        schemas: {
            Product: {
                type: 'object',
                required: ['name', 'price', 'category'],
                properties: {
                    name: { type: 'string' },
                    price: { type: 'number' },
                    description: { type: 'string' },
                    category: { type: 'string' },
                    brand: { type: 'string' },
                    stock: { type: 'integer' },
                    SKU: { type: 'string' },
                    specifications: {
                        type: 'object',
                        properties: {
                            processor: { type: 'string' },
                            ram: { type: 'string' },
                            storage: { type: 'string' },
                        },
                    },
                    warranty: { type: 'string' }, // New property
                    inStock: { type: 'boolean' },
                },
            },
            Category: {
                type: 'object',
                required: ['name', 'description'],
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    isActive: { type: 'boolean' },
                    features: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    brands: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                },
            },
        },
    },
};


const outputFile = './swagger_output.json';
const endpointsFiles = [
    './routes/products.js',
    './routes/categories.js',
    './routes/general.js'
];

swaggerAutogen()(outputFile, endpointsFiles, doc);