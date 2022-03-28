const jwt = require("jsonwebtoken");

const JWT_SECRET = "jwt_secret_key";

const fetchUser = (req, res, next) => {
  try {
    //Get the auth token from header
    const token = req.header("auth-token");

    //if token is invalid then send the 401 error
    if (!token) {
      res.status(401).send({ error: "Please authenticate using valid token" });
    }

    //verify the token
    const data = jwt.verify(token, JWT_SECRET);

    //{ user: { id: '623f285af51a55a09b6828ad' }, iat: 1648453934 } this is the data
    // add the user to request object
    req.user = data.user;

    //if everything is fine then it will go to next functiom
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .json({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
