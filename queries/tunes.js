const { errors } = require('pg-promise')
const db = require('../db/dbConfig.js')

const getAllTunes = async () => {
    try {
        const allTunes = await db.any('SELECT * FROM tunes');
        return allTunes
      } catch (error) {
        return error
      }
    }

    // Function to retrieve filtered tunes based on whether they are marked as favorites or not
const getFilteredTunes = async (isFavorite) => {
    try {
      // Querying the database to get tunes filtered by the is_favorite column
      const filteredTunes = await db.any(
        "SELECT * FROM tunes WHERE is_favorite = $1",
        isFavorite
      );
      return filteredTunes; // Returning the filtered tunes
    } catch (error) {
      return error; // Returning any error encountered during the process
    }
  };
  
  // Function to retrieve all tunes in ascending order of their names
  const getAllTunesAscOrder = async () => {
    try {
      // Querying the database to get all tunes ordered by name in ascending order
      const allTunesAscOrder = await db.any(
        "SELECT * FROM tunes ORDER BY name ASC"
      );
  
      return allTunesAscOrder; // Returning the tunes ordered in ascending order
    } catch (error) {
      return error; // Returning any error encountered during the process
    }
  };
  
  // Function to retrieve all tunes in descending order of their names
  const getAllTunesDescOrder = async () => {
    try {
      // Querying the database to get all tunes ordered by name in descending order
      const allTunesDescOrder = await db.any(
        "SELECT * FROM tunes ORDER BY name DESC"
      );
      return allTunesDescOrder; // Returning the tunes ordered in descending order
    } catch (error) {
      return error; // Returning any error encountered during the process
    }
  };  

    const getTune = async (id) => {
        try {
            const oneTune = await db.one('SELECT * FROM tunes WHERE id=$1', id)
            return oneTune
        }   catch (error) {
            return error
        }
    }

    const createTune = async (tune) => {
        try {
            const newTune = await db.one(
                'INSERT INTO tunes (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [tune.name, tune.artist, tune.album, tune.time, tune.is_favorite]
            )
            return newTune
        }   catch (error) {
            return error
        }
    }

    const deleteTune = async (id) => {
        try {
          const deletedTune = await db.one(
            "DELETE FROM tunes WHERE id = $1 RETURNING *",
            id
          );
          return deletedTune;
        } catch (error) {
          return error;
        }
      };

      const updateTune = async (id, tune) => {
        const {name, artist, album, time, is_favorite} = tune;
        try {
          const updatedTune = await db.one(
            "UPDATE tunes SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
            [name, artist, album, time, is_favorite, id]
          );
          return updatedTune;
        } catch (error) {
          return error;
        }
      };

module.exports = { getAllTunes, getTune, createTune, deleteTune, updateTune, getFilteredTunes, getAllTunesAscOrder, getAllTunesDescOrder }