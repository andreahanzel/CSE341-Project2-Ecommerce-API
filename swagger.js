import swaggerAutogen from 'swagger-autogen'; // Import the swagger-autogen library

const doc = {
    info: {
        title: 'E-commerce API',
        description: 'API for managing e-commerce products and categories'
    },
    host: 'cse341-ecommerce-api.onrender.com',
    basePath: '/api',
    schemes: ['https']
}; // Define the swagger document

const outputFile = './swagger_output.json'; // Define the output file
const endpointsFiles = [
    './routes/products.js', // Products route
    './routes/categories.js', // Categories route
    './routes/general.js', // General route for "/api"
];

swaggerAutogen()(outputFile, endpointsFiles, doc); // Generate the swagger documentation