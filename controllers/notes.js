const router = require("express").Router();
const { Note } = require("../models");

router.get("/", async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

router.post("/", async (req, res) => {
  console.log("in post");
  try {
    const note = await Note.create(req.body);
    console.log(req.body, "req.body");
    console.log(res.json, "res.body");
    console.log(note, "note");
    res.json(note);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

router.get("/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    res.json(note);
  } else {
    return res.status(404).end();
  }
});

router.delete("/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    await note.destroy();
  }
  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
