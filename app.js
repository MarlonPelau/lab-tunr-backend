const express = require("express");
const cors = require("cors");

const app = express();

const tuneController = require("./controllers/tuneController.js");

app.use(cors());
app.use(express.json());

app.use("/api/tunes", tuneController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Tune in to Tunr");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Nuthin' Eh Here!" });
});
// EXPORT
module.exports = app;
