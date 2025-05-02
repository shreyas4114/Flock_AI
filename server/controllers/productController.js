const Product = require('../models/product');

exports.addProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    wishlistId: req.params.wishlistId,
    addedBy: req.user.id,
  });
  await product.save();
  res.json(product);
};

exports.editProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    {
      ...req.body,
      editedBy: req.user.id
    },
    { new: true }
  );
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.json({ message: 'Product deleted' });
};
