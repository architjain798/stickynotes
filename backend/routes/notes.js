const express = require("express");
const router = express.Router();

const notes = router.get("/", (req, res) => {
  const obj = {
    name: "ritika",
    age: 27,
  };
  res.json(obj);
});

module.exports = notes;
