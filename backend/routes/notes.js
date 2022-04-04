const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Notes = require("../models/Notes");

//Route-1 Get all the notes for a user GET "api/notes/fetchallnotes" Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.send(notes);
});

//Route-2 Add a note for a user POST "api/notes/addnote" Login required
router.post(
  "/addnote",
  fetchUser,
  [
    //title must be of 5 characters
    body("title", "Enter a valid title").isLength({ min: 3 }),

    // description must be at least 5 chars long
    body("description", "Enter description of atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//Route-2 Add a note for a user PUT "api/notes/update/:noteid" Login required
router.put(
  "/update/:noteid",
  fetchUser,
  [
    //title must be of 5 characters
    body("title", "Enter a valid title").isLength({ min: 3 }),

    // description must be at least 5 chars long
    body("description", "Enter description of atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newNote = {};

      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      const noteStatus = await Notes.findById(req.params.noteid);

      if (!noteStatus) {
        return res.status(404).json({ errors: "Note does't exist" });
      }

      if (noteStatus.user.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ errors: "does't have permission to update note" });
      }

      const note = await Notes.findByIdAndUpdate(
        req.params.noteid,
        { $set: newNote },
        { new: true }
      );

      res.send(note);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
