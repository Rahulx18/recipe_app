const Video = require("../1_models/Video");

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

const addVideo = async (req, res) => {
  const data = req.body;
  try {
    const newVideo = new Video(data);
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllVideos, getRecentVideo, addVideo };
