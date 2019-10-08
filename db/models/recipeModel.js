const mongoose = require("../connection");

const recipeSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  img: { type: String, trim: true },
  ingredients: { type: Array, required: true },
  instructions: { type: Array, required: true },
  prepTime: { type: String, trim: true },
  cookTime: { type: String, trim: true },
  total: { type: String, trim: true },
  yield: { type: String, trim: true },
  tags: [String],
});

module.exports = mongoose.model("recipes", recipeSchema);
