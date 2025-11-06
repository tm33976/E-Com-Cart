import mongoose from 'mongoose';

// This is the schema or blueprint for our product data
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String }
}, {
  timestamps: true // Automatically adds "createdAt" and "updatedAt"
});

const Product = mongoose.model('Product', productSchema);
export default Product;