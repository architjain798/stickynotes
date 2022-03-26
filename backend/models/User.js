const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

//Added indexing so that unique email is getting stored in db
const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
