const express = require("express");
const router = express.Router();
const {
  getAllVideos,
  getRecentVideo,
  addVideo,
} = require("../middleware/videoMiddleware");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getAllVideos);
router.get("/recent", getRecentVideo);
router.post("/create", protect, admin, addVideo);

module.exports = router;
