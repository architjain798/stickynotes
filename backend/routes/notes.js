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
      //request object is parameter nikal liye
      const { title, description, tag } = req.body;

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //new note banaya aur sab data uske model ke according dal diya
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      //jo note object banaya usko abb db mein store kr diya
      const savedNote = await note.save();

      //return kr diya response
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//Route-3 Update a note for a user PUT "api/notes/update/:noteid" Login required
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
      //request object is parameter nikal liye
      const { title, description, tag } = req.body;

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //new note object ke andar sab parameter dal denge
      const newNote = {};

      //check krenge ki title exits kre to newNote object mein add kro
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //note ki id se db mein search kra ki uss id ka note exist krta hai ya nhi
      const noteStatus = await Notes.findById(req.params.noteid);

      //agar note exist nhi krta too
      if (!noteStatus) {
        return res.status(404).json({ errors: "Note does't exist" });
      }

      //ye check krenge ki jo note ki user id se user hai aur logined user hai vo same hai ya nhi
      //agar nhi hai too 403 error
      if (noteStatus.user.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ errors: "does't have permission to update note" });
      }

      //note ki id se notes db ko update kr denge
      const note = await Notes.findByIdAndUpdate(
        req.params.noteid,
        { $set: newNote },
        { new: true }
      );

      //send response to user
      res.send(note);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//Route-4 Delete a note for a user DELETE "api/notes/deletenote/:noteid" Login required
router.delete("/deletenote/:noteid", fetchUser, async (req, res) => {
  try {
    //note ki id se db mein search kra ki uss id ka note exist krta hai ya nhi
    const noteStatus = await Notes.findById(req.params.noteid);

    //agar note exist nhi krta too
    if (!noteStatus) {
      return res.status(404).json({ errors: "Note does't exist" });
    }

    //ye check krenge ki jo note ki user id se user hai aur logined user hai vo same hai ya nhi
    //agar nhi hai too 403 error
    if (noteStatus.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ errors: "does't have permission to update note" });
    }

    const note = await Notes.findByIdAndDelete(req.params.noteid);

    //send response to user
    res.send({ success: "note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
