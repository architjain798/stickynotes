const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const router = express.Router();

//creates a user using POST "/api/auth/" doesn't require auth
const auth = router.post(
  "/",
  [
    //name must be of 5 characters
    body("name", "Enter a valid name").isLength({ min: 5 }),

    // email must be an email
    body("email", "Enter valid email").isEmail(),

    // password must be at least 5 chars long
    body("password", "Enter password of atleast 5 character").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.username,
      password: req.body.password,
      email: req.body.email,
    }).then((user) => res.json(user));
  }
);

module.exports = auth;
