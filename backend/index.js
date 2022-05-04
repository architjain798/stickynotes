const express = require("express");
const connectToMongoDB = require("./db");

const auth = require("./routes/auth");
const notes = require("./routes/notes");

connectToMongoDB();

let app = express();
let PORT = process.env.PORT || 8080;
//built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("hello archit jain");
});

//Availabe routes
app.use("/api/auth", auth);
app.use("/api/notes", notes);

//port where server will be starting
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
