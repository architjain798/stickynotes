const mongoose = require("mongoose");

const mongoURI =
  "mongodb://localhost:27017/stickynotes?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connetToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongodb successfully");
  });
};

module.exports = connetToMongo;
