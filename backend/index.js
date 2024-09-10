const express = require("express");
const connectDB = require("./0_config/db");
const recipeRoutes = require("./3_routes/recipeRoutes");
const blogRoutes = require("./3_routes/blogRoutes");
const videoRoutes = require("./3_routes/videoRoutes");
const searchRoutes = require("./3_routes/searchRoutes");
const authRoutes = require("./3_routes/authRoutes");
const adminRoutes = require("./3_routes/adminRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
connectDB();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
    credentials: true, // If you're using cookies or sessions
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
