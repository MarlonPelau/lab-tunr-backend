const express = require("express");

const { 
    getAllTunes, 
    getTune,
    createTune,
} = require('../queries/tunes');
const {checkName, checkArtist, checkBoolean } = require("../validations/checkTunes");

const tunes = express.Router();

tunes.get("/", async (req, res) => {
  const allTunes = await getAllTunes()
  if (allTunes[0]) {
    res.status(200).json(allTunes)
  } else {
    res.status(500).json({ error: 'server error' })
  }
});


tunes.get("/:id", async (req, res) => {
  const { id } = req.params;
    const tune = await getTune(id);
    if (tune) {
        res.json(tune);
    } else {
        res.status(404).json({error: "not found"});
    }
});

tunes.post("/", checkName, async (req, res) => {
    try {
        const tune = await createTune(req.body);
        res.json(tune);
    }   catch(error) {
        res.status(400).json({error});
    }
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
