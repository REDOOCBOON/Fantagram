const express = require("express");

const {
  createPost,
  getPosts,
  toggleLike,
  addComment,
  uploadImage,
  deletePost,
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Upload Image
router.post(
  "/upload",
  protect,
  upload.single("image"),
  uploadImage
);

// Create Post
router.post("/", protect, createPost);
router.delete(
  "/:id",
  protect,
  deletePost
);

// Feed
router.get("/", getPosts);

// Like / Unlike
router.put("/:id/like", protect, toggleLike);

// Comment
router.post("/:id/comment", protect, addComment);

module.exports = router;