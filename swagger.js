import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'E-commerce API',
        description: 'API for managing e-commerce products and categories'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
    tags: [
        { name: 'General', description: 'General collection operations' },
        { name: 'Products', description: 'Product management endpoints' },
        { name: 'Categories', description: 'Category management endpoints' }
    ],
    definitions: {
        Product: {
            name: "Gaming Laptop",
            price: 1299.99,
            description: "High-performance gaming laptop",
            category: "Laptops",
            brand: "Dell",
            stock: 50,
            SKU: "GL-2024-001"
        },
        Category: {
            name: "Gaming",
            description: "Gaming devices and accessories",
            isActive: true,
            features: ["Performance", "Graphics", "Storage"],
            brands: ["Razer", "Alienware", "MSI"]
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);