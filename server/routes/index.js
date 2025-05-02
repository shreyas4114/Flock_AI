const express = require("express");
const authRouter = require("./authRoutes");
const wishlistsRouter = require("./wishlistsRoutes")
const productRouter = require("./productRoutes")
const router = express.Router();

router.get("/", function (req, res) {
    return res.send("Welcome to Flock AI Backend");
});

router.use("/auth", authRouter);
router.use("/wishlists", wishlistsRouter);
router.use("/", productRouter);

module.exports = router;