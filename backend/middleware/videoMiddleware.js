const Video = require("../1_models/Video");
const asyncHandler = require("express-async-handler");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecentVideo = async (req, res) => {
  try {
    const recentVideo = await Video.findOne().sort({ date: -1 });
    res.json(recentVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addVideo = asyncHandler(async (req, res) => {
  console.log("Request body: ", req.body);
  console.log("Authenticated User: ", req.user);

  const {
    title,
    embedCode,
    thumbnail,
    description,
    ingredients = [],
    recipeLink = "",
    externalLinks = {},
    tags = "",
    date = new Date(), // Set default value for date
  } = req.body;

  if (!title || !embedCode || !thumbnail || !description) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const video = await Video.create({
    title,
    embedCode,
    thumbnail,
    description,
    ingredients,
    recipeLink,
    externalLinks,
    tags,
    date, // Include date in the video object
    user: req.user._id,
  });

  if (video) {
    res.status(201).json({
      _id: video._id,
      title: video.title,
      embedCode: video.embedCode,
      thumbnail: video.thumbnail,
      description: video.description,
      ingredients: video.ingredients,
      recipeLink: video.recipeLink,
      externalLinks: video.externalLinks,
      tags: video.tags,
      date: video.date,
    });
  } else {
    res.status(400);
    throw new Error("Invalid video data");
  }
});

module.exports = { getAllVideos, getRecentVideo, addVideo };
