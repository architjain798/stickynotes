const express = require("express");
const router = express.Router();

//creates a user using POST "/api/auth/" doesn't require auth
const auth = router.get("/", (req, res) => {
  const obj = {
    name: "archit",
    age: 23,
  };
  console.log(req.body);
  res.json(obj);
});

module.exports = auth;
