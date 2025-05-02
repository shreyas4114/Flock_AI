const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  name: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
