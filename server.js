import express from 'express'; // Main application file
import { initDb } from './config/database.js'; // Import the entire package
import bodyParser from 'body-parser'; // Import the entire package
import router from './routes/index.js'; // .js is included
import { errorHandler } from './middleware/errorHandler.js'; // Added this import
const app = express(); // Create an Express application
const port = process.env.PORT || 3000; // Default port is 3000

app.use(bodyParser.json()); // Use .json() method from the imported package
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/', router); // Use the router for all routes

// Added error handling middleware AFTER all other middleware and routes
app.use(errorHandler);

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
}); 
