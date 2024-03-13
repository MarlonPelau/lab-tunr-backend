
const { errors } = require('pg-promise')
const db = require('../db/dbConfig.js')

const getAllTunes = async () => {
    try {
        const allTunes = await db.any('SELECT * FROM tunes WHERE is_favorite = FALSE ORDER BY name');
        return allTunes
      } catch (error) {
        return error
      }
    }

    // const sortedTunes = async () => {
    //     try {
    //         const allTunes = await db.any('SELECT * FROM tunes')
    //         return allTunes
    //       } catch (error) {
    //         return error
    //       }
    //     }

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

module.exports = { getAllTunes, getTune, createTune, deleteTune, updateTune }