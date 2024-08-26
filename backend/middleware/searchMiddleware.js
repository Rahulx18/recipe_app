const Recipe = require("../1_models/Recipe");
const Blog = require("../1_models/Blog");
const Video = require("../1_models/Video");

const searchAll = async (req, res) => {
  const query = req.query.q;
  if (!query || query.trim() === "") {
    return res.json({ recipes: [], blogs: [], videos: [] });
  }
  try {
    const recipes = await Recipe.find({ title: new RegExp(query, "i") });
    const blogs = await Blog.find({ title: new RegExp(query, "i") });
    const videos = await Video.find({ title: new RegExp(query, "i") });

    res.json({ recipes, blogs, videos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchAll };
