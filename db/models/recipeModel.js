const mongoose = require("../connection");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  img: { type: String, trim: true },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "ingredient",
    },
  ],
  instructions: { type: Array, required: true },
  prepTime: { type: String, trim: true },
  cookTime: { type: String, trim: true },
  total: { type: String, trim: true },
  yield: { type: String, trim: true },
  tags: [String],
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  date: { type: Date, default: Date.now() },
  reviews: [
    {
      reviewBody: {
        type: String,
        required: true,
      },
      reviewDate: { type: Date, default: Date.now() },
      reviewUser: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
});

module.exports = mongoose.model("recipes", RecipeSchema);
