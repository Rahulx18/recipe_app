const express = require("express");
const {
  fetchComments,
  addComment,
} = require("../middleware/commentMiddleware");
const router = express.Router();

router.get("/:postId/:type", fetchComments);
router.post("/:postId/:type", addComment);

module.exports = router;
