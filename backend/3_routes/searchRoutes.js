const express = require("express");
const router = express.Router();
const { searchAll } = require("../middleware/searchMiddleware");

router.get("/", searchAll);

module.exports = router;
