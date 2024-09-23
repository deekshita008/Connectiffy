import Post from "../models/Posts.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;

    // Logging request body and files for debugging
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files); 

    // Extract paths from uploaded files and normalize paths
    const picturePath = req.files?.picture ? req.files.picture[0].path.replace(/\\/g, '/') : null;
    const videoPath = req.files?.video ? req.files.video[0].path.replace(/\\/g, '/') : null;  // Normalize backslashes to forward slashes

    // Logging the extracted paths for debugging
    console.log("Picture Path:", picturePath);
    console.log("Video Path:", videoPath);

    // Fetch the user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a new post with description, picture, and video
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,            // Post description
      userPicturePath: user.picturePath,  // User's profile picture
      picturePath,            // Picture attached to the post
      videoPath,              // Video attached to the post
      likes: {},
      comments: [],
    });

    // Save the post to the database
    await newPost.save();

    // Fetch and return all posts
    const allPosts = await Post.find();
    res.status(201).json(allPosts);

  } catch (err) {
    console.error("Error creating post:", err); // Better logging for debugging
    res.status(409).json({ message: err.message });
  }
};


/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
