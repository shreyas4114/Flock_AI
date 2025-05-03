const Wishlist = require('../models/wishlist');
const User = require('../models/user');

exports.getAllWishlists = async (req, res) => {
  const userId = req.userId;
  const wishlists = await Wishlist.find({
    memberIds: userId
  });
  res.json(wishlists);
};

exports.createWishlist = async (req, res) => {
  const wishlist = new Wishlist({
    name: req.body.name,
    ownerId: req.userId,
    memberIds: [req.userId]
  });
  await wishlist.save();
  res.json(wishlist);
};

exports.getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);
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

exports.addMember = async (req, res) => {
  const { id } = req.params; // wishlist ID
  const { email } = req.body; // email of the user to add

  try {
    const userToAdd = await User.findOne({ email });
    if (!userToAdd) return res.status(404).json({ message: 'User not found' });

    const wishlist = await Wishlist.findById(id);
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    if (!wishlist.memberIds.includes(userToAdd._id)) {
      wishlist.memberIds.push(userToAdd._id);
      await wishlist.save();
    }

    res.json({ message: 'User added to wishlist', user: userToAdd });
  } catch (err) {
    res.status(500).json({ message: 'Error adding member', error: err.message });
  }
};