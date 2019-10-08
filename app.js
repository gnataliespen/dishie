//Load modules
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

//Load routes
const indexRoutes = require("./routes/indexRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

//handlebars setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

//bodyparser set up
const parser = app.use(bodyParser.urlencoded({ extended: true }));

//Use routes
app.use("/", indexRoutes);
app.use("/recipes", recipeRoutes);

//Server setup
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
