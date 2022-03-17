const express = require("express");
const User = require("../models/User");
const router = express.Router();

//creates a user using POST "/api/auth/" doesn't require auth
const auth = router.get("/", (req, res) => {
  console.log(req.body);

  //This is the way we store body parameter to db
  const user = User(req.body);
  user.save();

  //send whaterver the data we get from request as response back to client
  res.send(req.body);
});

module.exports = auth;
