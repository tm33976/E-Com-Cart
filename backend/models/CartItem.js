import mongoose from 'mongoose';
const { Schema } = mongoose;

// This blueprint is for items *in the cart*
const cartItemSchema = new Schema({
  // (BONUS) We use a mock user ID to make the cart persistent
  userId: { 
    type: String, 
    required: true, 
    default: 'mockUser123' // For this app, we'll hardcode one user
  },
  // We link this cart item to an actual product
  product: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product', // This 'ref' tells Mongoose to look at the 'Product' model
    required: true 
  },
  quantity: 
  { 
    type: Number, 
    required: true, 
    min: 1,
    default: 1 
  }
}, {
  timestamps: true
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
export default CartItem;