const mongoose = require("../connection");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  raw: { type: String, trim: true, required: true },
  product: { type: String, trim: true, required: true },
  quantity: { type: Number },
  unit: { type: String, trim: true, required: true },
  preparationNotes: { type: String, trim: true },
});

module.exports = mongoose.model("ingredient", IngredientSchema);
