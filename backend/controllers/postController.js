const Post = require("../models/Post");
const User = require("../models/User");

// Upload Image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    res.status(200).json({
      success: true,
      imageUrl: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    const user = await User.findById(req.user);

    if (!text && !image) {
      return res.status(400).json({
        success: false,
        message: "Post must contain text or image",
      });
    }

    const post = await Post.create({
      user: user._id,
      username: user.username,
      text: text || "",
      image: image || "",
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Feed
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Like / Unlike Post
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === req.user
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user
      );
    } else {
      post.likes.push(req.user);
    }

    await post.save();

    res.status(200).json({
      success: true,
      likesCount: post.likes.length,
      likes: post.likes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const user = await User.findById(req.user);

    post.comments.push({
      user: user._id,
      username: user.username,
      text,
    });

    await post.save();

    res.status(200).json({
      success: true,
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (
      post.user.toString() !== req.user
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Not authorized to delete this post",
      });
    }

    await Post.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};