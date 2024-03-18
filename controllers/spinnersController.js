// those dependencies
const express = require("express");

const spinners = express.Router({mergeParams: true});
const { getTune } = require('../queries/tunes.js');
// Those Queries
const {
  getAllSpinners,
  getSpinner,
  newSpinner,
  deleteSpinner,
  updateSpinner,
} = require("../queries/spinners.js");

// INDEX
spinners.get("/", async (req, res) => {
  const { tunes_id } = req.params;
  const allSpinners = await getAllSpinners(tunes_id);
  const tune = await getTune(tunes_id)

  if (tune.id) {
    res.status(200).json({...tune, allSpinners})
  } else {
    res.status(500).json({error: 'Tune not found or server error'})
  }
  }
);

// SHOW
spinners.get("/:id", async (req, res) => {
  const { tunes_id, id } = req.params;
  const spinner = await getSpinner(id);
  const tune = await getTune(tunes_id)

  if (spinner) {
    res.json({...tune, spinner});
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// UPDATE
// controllers/spinnersController.js
// UPDATE
spinners.put('/:id', async (req, res) => {
    const { id, tunes_id } = req.params
    console.log(id, req.params.tunes_id)
    const updatedSpinner = await updateSpinner({ tunes_id, id, ...req.body })
    if (updatedSpinner.id) {
      res.status(200).json(updatedSpinner)
    } else {
      res.status(404).json('Spin not found')
    }
  })

// CREATE

// controllers/spinnersController.js
spinners.post('/', async (req, res) => {
    const { tunes_id } = req.params
    const spinner = await newSpinner({...req.body, tunes_id })
    res.status(200).json(spinner)
  })

// DELETE
spinners.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSpinner  = await deleteSpinner(id);
  if (deletedSpinner.id) {
    res.status(200).json(deletedSpinner);
  } else {
    res.status(404).json({ error: "Spin not found" });
  }
});

module.exports = spinners;