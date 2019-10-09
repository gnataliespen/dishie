if (process.env.NODE_ENV === "production") {
  module.exports = require("./config/keysProd.js");
} else {
  module.exports = require("./config/keysDev.js");
}
