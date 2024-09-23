import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import searchRoutes from './routes/search.js';
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Posts.js";

// File and directory path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize environment variables
dotenv.config();
const app = express();

// Middleware setup
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Serve static files from the "public/assets" directory
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Multer File Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");  // Upload files to this folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  // Use the original file name
  }
});

// Initialize multer upload with storage
const upload = multer({ storage });

// Routes for file uploads

// Registration with profile picture upload
app.post("/auth/register", upload.single('picture'), register);

// Post creation with multiple file uploads (image and video only)
app.post(
  "/posts", 
  verifyToken, 
  upload.fields([
    { name: 'picture', maxCount: 1 },     // For image uploads
    { name: 'video', maxCount: 1 },       // For video uploads (renamed from clip to video)
  ]), 
  createPost
);

// Other routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use('/search', searchRoutes);
// MongoDB connection setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(`${err} did not connect`));
