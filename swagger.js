import swaggerAutogen from 'swagger-autogen'; //Swagger documentation generator
import dotenv from 'dotenv'; //Load environment variables
dotenv.config(); //Load environment variables

const doc = {
  info: {
    title: 'Ecommerce API',
    description: 'API for managing products and categories'
  },
  host: process.env.HOST || 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https']
}; //Swagger documentation configuration

const outputFile = './swagger_output.json'; //Output file for Swagger documentation
const endpointsFiles = ['./routes/products.js', './routes/categories.js']; // Files to include in Swagger documentation

//Generate Swagger documentation

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  // Import server.js dynamically
  await import('./server.js');
});
