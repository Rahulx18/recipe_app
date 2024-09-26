const Comment = require("../1_models/Comment");

// Fetch comments for a specific post
const fetchComments = async (req, res) => {
  const { postId, type } = req.params;

  try {
    const comments = await Comment.find({ postId, type });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

// Add a new comment
const addComment = async (req, res) => {
  const { postId, type } = req.params;
  const { text } = req.body;

  const newComment = new Comment({
    text,
    postId,
    type,
  });
  console.log(text, postId, type);
  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

module.exports = { fetchComments, addComment };
