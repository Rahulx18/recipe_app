const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
} = require("../middleware/recipeMiddleware");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/create", protect, admin, createRecipe);

module.exports = router;
