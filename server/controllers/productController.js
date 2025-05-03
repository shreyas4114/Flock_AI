const Product = require('../models/product');

exports.addProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    wishlistId: req.params.wishlistId,
    addedBy: req.userId,
  });
  await product.save();
  res.json(product);
};

exports.editProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    {
      ...req.body,
      editedBy: req.userId
    },
    { new: true }
  );
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.json({ message: 'Product deleted' });
};

exports.getProductsInWishlist = async (req, res) => {
  const { wishlistId } = req.params;

  try {
    const products = await Product.find({ wishlistId }).populate('addedBy', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

