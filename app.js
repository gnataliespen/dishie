//Load modules
const express = require("express");

//Middleware

const app = express();

app.get("/", (req, res) => {
  res.send("howsdy");
});

const port = process.env.PORT || 3000;
//Server setup
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
