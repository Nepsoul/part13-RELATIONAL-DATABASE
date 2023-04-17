const express = require("express");
const app = express();
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

//importing routes
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

//middleware to parse incoming JSON data
app.use(express.json());

//giving paths
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

// app.get("/api/notes", async (req, res) => {
//   const notes = await Note.findAll();
//   console.log(JSON.stringify(notes, null, 2), "get all api");
//   //   const notes = await sequelize.query("SELECT * FROM notes", {
//   //     type: QueryTypes.SELECT,
//   //   });
//   res.json(notes);
// });

// app.get("/api/notes/:id", async (req, res) => {
//   const note = await Note.findByPk(req.params.id);
//   if (note) {
//     console.log(note.toJSON());
//     res.json(note);
//   } else {
//     //res.status(404).end();
//     res.status(404).send({ message: "no such note" });
//   }
// });

// //adding simple error handling when creating note
// //route to handle incoming POST requests/ implementing endpoint
// app.post("/api/notes", async (req, res) => {
//   try {
//     const note = await Note.create(req.body);
//     return res.json(note);
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// });

// app.put("/api/notes/:id", async (req, res) => {
//   const note = await Note.findByPk(req.params.id);
//   if (note) {
//     console.log(note, "note updat");
//     note.important = req.body.important;
//     console.log(note.important, "note imp");
//     await note.save();
//     res.json(note);
//   } else {
//     res.status(404).end();
//   }
// });

//const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
start();
