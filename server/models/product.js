const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  price: Number,
  wishlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
