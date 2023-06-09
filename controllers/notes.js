const router = require("express").Router();
const { Note } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const { User } = require("../models");

//middleware placed at where used path after route("/:id")
const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

//middleware
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

router.get("/", async (req, res) => {
  const where = {};
  if (req.query.important) {
    where.important = req.query.important === "true"; //req query
  }

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search,
    };
  }

  const notes = await Note.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name", "username"],
    },
    where,
  });
  res.json(notes);
});

//route to handle incoming POST requests/ implementing endpoint
router.post("/", tokenExtractor, async (req, res) => {
  try {
    // const user = await User.findByPk(req.decodedToken.id);
    const note = await Note.create({
      ...req.body,
      userId: req.decodedToken.id,
      date: new Date(),
    });
    res.json(note);
  } catch (err) {
    return res.status(400).json({ err: "note not added" });
  }
});

router.get("/:id", noteFinder, async (req, res) => {
  // "/:id", req.params
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
