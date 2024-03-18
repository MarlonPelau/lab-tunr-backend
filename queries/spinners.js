const db = require("../db/dbConfig.js");


const getAllSpinners = async (tunes_id) => {
  try {
    const allSpinners = await db.any("SELECT * FROM spinners WHERE tunes_id=$1", tunes_id);
    return allSpinners;
  } catch (error) {
    return error;
  }
};

const getSpinner = async (id) => {
  try {
    const oneSpinner = await db.one("SELECT * FROM spinners WHERE id=$1", id);
    return oneSpinner;
  } catch (error) {
    return error;
  }
};

const newSpinner = async (spinner) => {
  try {
    const newSpinner = await db.one(
      "INSERT INTO spinners (performer, playlist, titles, DJ, content, tunes_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        spinner.performer,
        spinner.playlist,
        spinner.titles,
        spinner.DJ,
        spinner.content,
        spinner.tunes_id,
      ]
    );
    return newSpinner;
  } catch (error) {
    return error;
  }
};

const deleteSpinner = async (id) => {
  try {
    const deletedSpinner = await db.one(
      "DELETE FROM spinners WHERE id = $1 RETURNING *",
      id
    );
    return deletedSpinner;
  } catch (error) {
    return error;
  }
};

const updateSpinner = async (spinner) => {
    try {
      const updatedSpinner = await db.one(
        'UPDATE spinners SET performer=$1, playlist=$2, titles=$3, DJ=$4, content=$5, tunes_id=$6 WHERE id=$7 RETURNING *',
        [
          spinner.performer,
          spinner.playlist,
          spinner.titles,
          spinner.DJ,
          spinner.content,
          spinner.tunes_id,
          spinner.id,
        ]
      )
      return updatedSpinner
    } catch (error) {
      return error
    }
  };

module.exports = {
  getAllSpinners,
  getSpinner,
  newSpinner,
  deleteSpinner,
  updateSpinner,
};