const express = require("express");
const connectToMongoDB = require("./db");

connectToMongoDB();

let app = express();

app.get("/", (req, res) => {
  res.send("hello archit jain");
});

app.listen(8080, () => {
  console.log("server started");
});
