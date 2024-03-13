const express = require("express");

const { 
    getAllTunes, 
    getTune,
    createTune,
    deleteTune,
    updateTune,
} = require('../queries/tunes');
const {checkName, checkArtist, checkBoolean } = require("../validations/checkTunes");

const tunes = express.Router();

tunes.get("/", async (req, res) => {
  const allTunes = await getAllTunes()
//   const sortedTunes = tunes.sort((a, b) => a.title.localeCompare(b.title));
//   res.json(sortedTunes);
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

tunes.post("/", checkName, checkArtist, checkBoolean, async (req, res) => {
    try {
        const tune = await createTune(req.body);
        res.json(tune);
    }   catch(error) {
        res.status(400).json({error});
    }
});

// update is what we're doing here below
tunes.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const updatedTune = await updateTune(id, req.body);
    res.status(200).json(updatedTune);
  } else {
    res.status(400).json({ error });
  }
});

tunes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedTune = await deleteTune(id);
  if (deletedTune.id) {
    res.status(200).json(deletedTune);
  } else {
    res.status(404).json("Tune not found");
  }
});

module.exports = tunes;
