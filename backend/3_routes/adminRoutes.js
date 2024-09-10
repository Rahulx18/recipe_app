const express = require("express");
const { admin, protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, admin, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
