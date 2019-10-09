const mongoose = require("mongoose");
const keys = require("../config/keys");

//Map global promises
mongoose.Promise = global.Promise;
//Mongoose Connect
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

module.exports = mongoose;
