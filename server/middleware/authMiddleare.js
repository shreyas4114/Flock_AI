require("dotenv").config({ path: '../.env' });
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Invalid authorization. No token provided or invalid format."
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(401).json({
                message: "User ID missing in token"
            });
        }

    } catch (err) {
        console.error("Authorization error: ", err);

        return res.status(401).json({
            message: "Error while authorizing. Token might be invalid or expired.",
            error: err.message
        });
    }
};

module.exports = authMiddleware;
