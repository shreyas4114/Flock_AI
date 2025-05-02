const Wishlist = require('../models/wishlist');

exports.getAllWishlists = async (req, res) => {
  const userId = req.user.id;
  const wishlists = await Wishlist.find({
    memberIds: userId
  });
  res.json(wishlists);
};

exports.createWishlist = async (req, res) => {
  const wishlist = new Wishlist({
    name: req.body.name,
    ownerId: req.user.id,
    memberIds: [req.user.id]
  });
  await wishlist.save();
  res.json(wishlist);
};

exports.updateWishlist = async (req, res) => {
  const wishlist = await Wishlist.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.json(wishlist);
};

exports.deleteWishlist = async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.json({ message: 'Wishlist deleted' });
};
