import mongoose from 'mongoose';

const cartDetailSchema = new mongoose.Schema({
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  productDetailId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductDetail",
  },
  quantity: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('CartDetail', cartDetailSchema);