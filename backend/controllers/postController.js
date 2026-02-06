const Post = require('../models/Post');
const { uploadToCloudinary } = require('../config/cloudinary');

// CREATE POST (Auth check ke saath)
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    let imageUrl = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    // Dono fields empty nahi ho sakte
    if (!content && !imageUrl) {
      return res.status(400).json({ message: "Either text or image is required" });
    }

    const newPost = await Post.create({
      userId: req.user.id,
      username: req.user.username,
      content: content || "",
      imageUrl: imageUrl || ""
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Post failed", details: err.message });
  }
};

// GET ALL POSTS (Public Feed)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
};

// LIKE POST (Toggle Logic)
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user.id;

    if (post.likes.includes(userId)) {
      post.likes.pull(userId); // Unlike
    } else {
      post.likes.push(userId); // Like
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Like failed" });
  }
};

// COMMENT ON POST (New Feature)
exports.commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    const newComment = {
      username: req.user.username, // Username store karna hai as per requirement
      text: text,
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Comment failed" });
  }
};