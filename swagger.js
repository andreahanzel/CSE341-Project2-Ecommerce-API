import swaggerAutogen from 'swagger-autogen'; // Import the swagger-autogen library

const doc = {
    info: {
        title: 'E-commerce API',
        description: 'API for managing e-commerce products'
    },
    host: 'localhost:3000',
    schemes: ['http']
}; // Define the swagger document

const outputFile = './swagger_output.json'; // Define the output file
const endpointsFiles = ['./routes/products.js']; // Define the endpoint files

swaggerAutogen()(outputFile, endpointsFiles, doc); // Generate the swagger documentation