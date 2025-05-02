const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleare');

router.post('/:wishlistId/products', auth, productController.addProduct);
router.put('/products/:productId', auth, productController.editProduct);
router.delete('/products/:productId', auth, productController.deleteProduct);

module.exports = router;
