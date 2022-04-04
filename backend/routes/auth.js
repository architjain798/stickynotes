const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

const JWT_SECRET = "jwt_secret_key";

//Route-1 : creates a user using POST "/api/auth/" doesn't require auth
router.post(
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
      //finding the email from db
      let user = await User.findOne({ email: req.body.email });

      //if email is not in db then it will return from here sending the status code to 500
      if (user) {
        return res.status(400).json({ error: "Sorry some error occured" });
      }

      //added the salt and used bcrypt to hash the passowrd
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      //Otherwise it will store it in db
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });

      //used jwt validation to create a token
      // here we sending the user id as payload because it used as indexed in db
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);

      //send the TOKEN back to the client
      res.json({ token });
    } catch (error) {
      //if there are some exception thrown duw to some syntax mistake or anything else
      //it will come here and tell to client that there is this type of error
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//Route-2 : Authenticate a user POST:"api/auth/login" No login required
router.post(
  "/login",
  [
    // email must be an email
    body("email", "Enter valid email").isEmail(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //get all email and password from request object
    const { email, password } = req.body;

    try {
      //finding the email from db
      let user = await User.findOne({ email });

      //if email is not in db then it will return from here sending the status code to 500
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      //Used bcryot to compare the user entered password and hash passowrd
      //create the hash of user password and compare with hash passowrd
      const passwordCompare = await bcrypt.compare(password, user.password);

      //to match the password
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      //send the payload to generate token
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);

      //send the TOKEN back to the client
      res.json({ token });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//Route-3 Fetch user details POST:"api/login/getuser" Login required
//fetcherUser is the middleware used to verify the user
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    //{ user: { id: '623f285af51a55a09b6828ad' }, iat: 1648453934 } this is the data
    //get the id from req object
    let userId = req.user.id;

    //find the user with the user id and select all the fields except the password
    const user = await User.findById(userId).select("-password");

    //send the user as response
    res.send(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
