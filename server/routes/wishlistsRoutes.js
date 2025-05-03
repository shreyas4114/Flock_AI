const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const auth = require('../middleware/authMiddleare');

router.get('/', auth, wishlistController.getAllWishlists);
router.post('/', auth, wishlistController.createWishlist);
router.get('/:id', auth, wishlistController.getWishlist);
router.put('/:id', auth, wishlistController.updateWishlist);
router.delete('/:id', auth, wishlistController.deleteWishlist);
router.put('/:id/add-member', auth, wishlistController.addMember);

module.exports = router;
