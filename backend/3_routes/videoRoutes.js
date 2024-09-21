const express = require("express");
const router = express.Router();
const {
  getAllVideos,
  getVideoById,
  addVideo,
} = require("../middleware/videoMiddleware");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getAllVideos);
router.get("/:id", getVideoById);
router.post("/create", protect, admin, addVideo);

module.exports = router;
