const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("This is the API Server");
});

app.listen(5000, () => {
  console.log("App running");
});
