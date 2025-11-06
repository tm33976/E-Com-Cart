import express from 'express';
import Product from '../models/Product.js';
import CartItem from '../models/CartItem.js';

const router = express.Router();

// A simple mock user ID for our (BONUS) persistent cart
const MOCK_USER_ID = 'mockUser123';

// Product API

// GET /api/products
// Gets all products from the database
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

//  Cart APIs 

// GET /api/cart
// Gets all cart items for our mock user and calculates the total
router.get('/cart', async (req, res) => {
  try {
    // We 'populate' the product field
    // This replaces the 'productId' with the full product object
    const cartItems = await CartItem.find({ userId: MOCK_USER_ID }).populate('product');
    
    // Calculate the total price on the backend for security
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({ items: cartItems, total: total });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err.message });
  }
});

// POST /api/cart
// Adds an item to the cart, or updates its quantity if it already exists
router.post('/cart', async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: 'Invalid request: productId and quantity > 0 are required.' });
  }

  try {
    // Check if the item is already in the cart for this user
    let existingItem = await CartItem.findOne({ product: productId, userId: MOCK_USER_ID });

    if (existingItem) {
      // If it exists, just update the quantity
      existingItem.quantity += quantity;
      await existingItem.save();
      res.status(200).json(existingItem);
    } else {
      // If it's a new item, create it
      const newItem = new CartItem({
        userId: MOCK_USER_ID,
        product: productId,
        quantity: quantity
      });
      await newItem.save();
      res.status(201).json(newItem);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err.message });
  }
});

// DELETE /api/cart/:id
// Removes a specific cart item (using its *cart item* ID, not product ID)
router.delete('/cart/:id', async (req, res) => {
  const { id } = req.params; // This 'id' is the CartItem's _id

  try {
    const deletedItem = await CartItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(200).json({ message: 'Item removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing from cart', error: err.message });
  }
});

//   PUT /api/cart/:id 
// Updates the quantity of a specific cart item
router.put('/cart/:id', async (req, res) => {
  const { id } = req.params; // This is the CartItem's _id
  const { quantity } = req.body;

  // Basic validation
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  try {
    const updatedItem = await CartItem.findByIdAndUpdate(
      id,
      { quantity: quantity },
      { new: true } // This option returns the new, updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart item', error: err.message });
  }
});

// Checkout API 

// POST /api/checkout
// Creates a mock receipt and clears the user's cart
router.post('/checkout', async (req, res) => {
  const { userInfo, total } = req.body; // We get user info and total from the frontend

  try {
    
    // We'd also process a payment.
    // For this mock app, we'll just generate a receipt.

    const mockReceipt = {
      user: userInfo,
      total: total,
      timestamp: new Date().toISOString(),
      receiptId: `mock_${Date.now()}`
    };

    // After checkout, we clear the user's cart
    await CartItem.deleteMany({ userId: MOCK_USER_ID });

    // Send back the mock receipt
    res.status(200).json(mockReceipt);
  } catch (err) {
    res.status(500).json({ message: 'Error processing checkout', error: err.message });
  }
});

export default router;