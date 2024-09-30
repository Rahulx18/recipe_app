const express = require("express");
const {
  fetchComments,
  addComment,
  deleteComment,
} = require("../middleware/commentMiddleware");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/:postId/:type", fetchComments);
router.post("/:postId/:type", protect, addComment);
router.delete("/:commentId", protect, deleteComment);
module.exports = router;
