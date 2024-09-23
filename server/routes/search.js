// routes/search.js
import express from 'express';
import User from '../models/User.js'; // Assuming you have a User model
import { verifyToken } from '../middleware/auth.js'; // Import the verifyToken middleware

const router = express.Router();

// Apply the verifyToken middleware to protect the search route
console.log("VVVVVVV")
router.get('/users', verifyToken, async (req, res) => {
    try {
        const query = req.query.query; // Extract the search query from the request
        console.log(query,'asf')
        // Check if query is provided, if not return a 400 error
        if (!query) {
            return res.status(400).json({ message: "No search term provided" });
        }

        // Perform a case-insensitive search using regex on both firstName and lastName
        const users = await User.find({
            $or: [
                { firstName: { $regex: query, $options: "i" } }, // Case-insensitive regex search
                { lastName: { $regex: query, $options: "i" } }
            ]
        }).select("firstName lastName _id"); // Only return first name, last name, and ID for efficiency

        // Send the matched users as response
        res.status(200).json(users);
    } catch (err) {
        console.error("Error during search:", err); // Log error and stack trace
        res.status(500).json({ message: err.message });
    }
});

export default router;
