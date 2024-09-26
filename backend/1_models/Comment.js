const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, // Ensure this is set correctly
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Blog", // Or the appropriate reference model
  },
  type: {
    type: String,
    required: true, // Adjust based on your needs
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
