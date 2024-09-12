const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    embedCode: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [
      {
        name: { type: String, required: true },
        link: { type: String },
      },
    ],
    recipeLink: { type: String },
    externalLinks: {
      songLink: { type: String },
      subscriptionLink: { type: String },
    },
    tags: { type: [String], default: [] },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt
  }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
