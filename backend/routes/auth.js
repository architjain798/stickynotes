const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const router = express.Router();

//creates a user using POST "/api/auth/" doesn't require auth
const auth = router.post(
  "/createuser",
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
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //findinf the email from db
      let user = await User.findOne({ email: req.body.email });

      //if email is in db then it will return from here sending the status code to 500
      if (user) {
        return res.status(400).json({ error: "Sorry some error occured" });
      }

      //Otherwise it will store it in db
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      //send the response back to the client
      res.json(user);
    } catch (error) {
      //if there are some exception thrown duw to some syntax mistake or anything else
      //it will come here and tell to client that there is this type of error
      console.log(error.message);
      res.status(500).json({ error: "Some error occured" });
    }
  }
);

module.exports = auth;
