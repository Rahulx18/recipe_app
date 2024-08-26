const express = require("express");
const connectDB = require("./0_config/db");
const recipeRoutes = require("./3_routes/recipeRoutes");
const blogRoutes = require("./3_routes/blogRoutes");
const videoRoutes = require("./3_routes/videoRoutes");
const searchRoutes = require("./3_routes/searchRoutes");
const authRoutes = require("./3_routes/authRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
