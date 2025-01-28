import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const doc = {
  info: {
    title: 'Ecommerce API',
    description: 'API for managing products and categories'
  },
  host: process.env.HOST || 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https']
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/products.js', './routes/categories.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  // Import server.js dynamically
  await import('./server.js');
});
