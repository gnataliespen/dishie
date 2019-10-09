const mongoose = require("../connection");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  googleID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  myRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "recipes",
    },
  ],
});

module.exports = mongoose.model("users", UserSchema);
