const router = require("express").Router();
const { Note } = require("../models");

//middleware placed at where used path after route("/:id")
const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

//route to handle incoming POST requests/ implementing endpoint
router.post("/", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.json(note);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

router.get("/:id", noteFinder, async (req, res) => {
  // const note = await Note.findByPk(req.params.id);
  if (req.note) {
    res.json(req.note);
  } else {
    return res.status(404).end();
  }
});

router.delete("/:id", noteFinder, async (req, res) => {
  //   const note = await Note.findByPk(req.params.id);
  if (req.note) {
    await req.note.destroy();
  }
  res.status(204).json({ message: "note has been deleted" }).end();
});

router.put("/:id", noteFinder, async (req, res) => {
  //   const note = await Note.findByPk(req.params.id);
  if (req.note) {
    req.note.important = req.body.important;
    await req.note.save();
    res.json(req.note);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
