const asyncHandler = require("express-async-handler");
const Comment = require("../1_models/Comment");

const fetchComments = asyncHandler(async (req, res) => {
  const { postId, type } = req.params;

  const comments = await Comment.find({ postId, type })
    .sort({ createdAt: -1 })
    .populate("user", "username isAdmin"); // Populating the user field with only the username

  res.json(comments);
});

const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { postId, type } = req.params;

  if (!text) {
    res.status(400);
    throw new Error("Comment text is required");
  }

  const comment = await Comment.create({
    text,
    postId,
    type,
    user: req.user._id,
  });

  res.status(201).json(comment);
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this comment");
  }

  await Comment.deleteOne({ _id: req.params.commentId });

  res.json({ message: "Comment removed" });
});

module.exports = { fetchComments, addComment, deleteComment };
