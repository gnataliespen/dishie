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
  instructions: { type: Array, trim: true, required: true },
  prepTime: { type: String, trim: true },
  cookTime: { type: String, trim: true },
  total: { type: String, trim: true },
  yield: { type: String, trim: true },
  tags: [String],
  comments: [
    {
      commentBody: { type: Array, trim: true, required: true },
      commentDate: { type: Date, default: Date.now() },
      commentUser: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  date: { type: Date, default: Date.now() },
});
//Set text input for search
RecipeSchema.indexes({ "$**": "text" });
module.exports = mongoose.model("recipes", RecipeSchema);
