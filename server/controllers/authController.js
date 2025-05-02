require("dotenv").config({ path: '../.env' });
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;                             
const jwt = require("jsonwebtoken")
const zod = require('zod');

const signupSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string()
});

const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
});

exports.createNewUser = async (req, res) => {
    console.log("Request body: ", req.body);

    try {
        // Validate request body using Zod
        const userData = signupSchema.parse(req.body);

        const { email, name, password } = userData;

        const hashPass = await bcryptjs.hash(password, saltRounds);

        let user = await User.findOne({ email });

        // If the user already exists
        if (user) {
            return res.status(409).json({
                status: false,
                error: {
                    code: 409,
                    message: "User already exists",
                },
            });
        }

        console.log("Creating new user: ", { email, name });

        let newUser = await User.create({
            name,
            email,
            password: hashPass,
        });

        const userId = newUser._id;
        let data;

        try {
            const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "365d"});
            data = newUser.toObject();
            data.token = token;
        } catch (err) {
            return res.status(500).json({
                message: "Error occurred while generating token",
                error: err.message
            });
        }

        console.log("Sending new user: ", data);
        return res.status(201).json({
            status: true,
            data: data,
        });

    } catch (err) {
        
        return res.status(500).json({
            status: false,
            error: {
                code: 500,
                message: "Error occurred!",
                error: err.message
            }
        });
    }
};

exports.login = async function (req, res) {
    console.log("Login request body: ", req.body);

    try {
        const loginData = loginSchema.parse(req.body);
        const { email, password } = loginData;

        // Find user by email
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: false,
                error: {
                    code: 404,
                    message: "User not found!"
                }
            });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: false,
                error: {
                    code: 401,
                    message: "Invalid credentials, please check your email and password."
                }
            });
        }

        // Generate JWT token
        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "365d" });

        // Prepare user data to send in the response
        const data = user.toObject();
        data.token = token;

        console.log("Login successful, sending user data: ", data);

        // Send the response with user data and token
        return res.status(200).json({
            status: true,
            data: data
        });

    } catch (err) {

        // Handle other errors (e.g. database or server errors)
        console.error("Error during login: ", err);
        return res.status(500).json({
            status: false,
            error: {
                code: 500,
                message: "Internal server error",
                details: err.message
            }
        });
    }
};

exports.profile = async function (req, res) {
    // The userId is available from the authMiddleware (set in req.userId)
    const userId = req.userId;  
    console.log("User ID from middleware: ", userId);

    try {
        // Find the user in the database by userId
        const user = await User.findById(userId);

        // If no user is found, return a 404 error
        if (!user) {
            return res.status(404).json({
                status: false,
                data: null,
                error: {
                    code: 404,
                    message: "User not found!"
                }
            });
        }

        // Extract relevant fields to return
        const { _id, name, email } = user;

        // Return user profile details
        return res.json({
            status: true,
            data: {
                _id,
                name,
                email
            }
        });
    } catch (error) {
        console.error("[Auth: Profile] Error: ", error);
        return res.status(500).json({
            status: false,
            error: {
                code: 500,
                message: "An error occurred while fetching the profile.",
                error: error.message
            }
        });
    }
};
