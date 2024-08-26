const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
} = require("../middleware/blogMiddleware");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/create", protect, admin, createBlog);

module.exports = router;
