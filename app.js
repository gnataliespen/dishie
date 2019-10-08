//Load modules
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//passport config
require("./config/passport")(passport);

//Load routes
const indexRoutes = require("./routes/indexRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//handlebars setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

//bodyparser set up
const parser = app.use(bodyParser.urlencoded({ extended: true }));

//app.use(cookieParser());

//Express Session Middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//Use routes
app.use("/", indexRoutes);
app.use("/recipes", recipeRoutes);
app.use("/auth", authRoutes);

//Server setup
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
