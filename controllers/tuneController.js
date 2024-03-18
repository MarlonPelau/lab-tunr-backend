const express = require("express");
const tunes = express.Router();
const spinnersController = require('./spinnersController.js');
tunes.use('/:tunes_id/spinners', spinnersController);

const { 
    getAllTunes, 
    getTune,
    createTune,
    deleteTune,
    updateTune,
    getFilteredTunes,
    getAllTunesAscOrder,
    getAllTunesDescOrder,
} = require('../queries/tunes');
const {checkName, checkArtist, checkBoolean } = require("../validations/checkTunes");

// INDEX route to retrieve all tunes
tunes.get("/", async (req, res) => {
    try {
      // Extracting 'order' and 'is_favorite' parameters from the request query
      const { order, is_favorite } = req.query;
  
      // Handle sorting if 'order' parameter is provided
      if (order === "asc") {
        // Sorting tunes by name in ascending or descending order based on 'order' value
        const ascendingOrderTunes = await getAllTunesAscOrder();
        res.json({ tunes: ascendingOrderTunes });
      } else if (order === "desc") {
        const descendingOrderTunes = await getAllTunesDescOrder();
        res.json({ tunes: descendingOrderTunes });
      }
  
      // Filtering tunes by 'is_favorite' if provided
      else if (is_favorite === "true" || is_favorite === "false") {
        // Converting string value to boolean
        const isFavorite = await getFilteredTunes(is_favorite);
        // Appending WHERE clause to filter tunes by 'is_favorite' value
        res.json({ isFavorite: isFavorite });
      } else {
        // Fetching all tunes from the database using the 'getAllTunes' function
        const allTunes = await getAllTunes();
        // Sending the fetched tunes as a JSON response
        res.status(200).json(allTunes);
      }
    } catch (error) {
      // Handling server errors
      console.error(error);
      res.status(500).json({ error: "server error" });
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
