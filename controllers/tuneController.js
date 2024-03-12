const express = require("express");

const { getAllTunes } = require('../queries/tunes');
const tunes = express.Router();
tunes.get("/", async (req, res) => {
  const allTunes = await getAllTunes()
  if (allTunes[0]) {
    res.status(200).json(allTunes)
  } else {
    res.status(500).json({ error: 'server error' })
  }
})

tunes.get("/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Get by id:${id} router` });
});

tunes.post("/", (req, res) => {
  res.json({ message: "Post route" });
});

tunes.put("/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Update item at id: ${id}` });
});

tunes.delete("/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Delete Item based on id: ${id}` });
});

module.exports = tunes;
