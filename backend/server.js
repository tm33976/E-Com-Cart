import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import apiRoutes from './routes/api.js';
import Product from './models/Product.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// These help our server understand JSON and talk to our frontend
app.use(cors()); // Allows our frontend to make requests to this backend
app.use(express.json()); // Parses incoming JSON requests

// Database Connection 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
    // Let's seed our database after connecting
    seedDatabase();
  })
  .catch(err => {
    console.error('Connection error', err.message);
  });

//  API Routes 
// All our api routes will live in './routes/api.js'
app.use('/api', apiRoutes);

//  Database Seeding Function
// This will populate our DB with products from the Fake Store API
const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      console.log('Products already exist. No need to seed.');
      return;
    }

    console.log('No products found. Seeding database...');
    const { data } = await axios.get('https://fakestoreapi.com/products?limit=10');
    
    // We just want to re-map the data slightly to match our model
    const productsToSave = data.map(apiProduct => ({
      name: apiProduct.title,
      price: apiProduct.price,
      description: apiProduct.description,
      image: apiProduct.image,
      category: apiProduct.category,
    }));


    await Product.insertMany(productsToSave);
    console.log('Database seeded successfully with 10 products!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

//  Start The Server 
app.listen(PORT, () => {
  console.log(` Backend server is running on http://localhost:${PORT}`);
});