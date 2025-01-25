import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'E-commerce API',
        description: 'API for managing e-commerce products'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/products.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);