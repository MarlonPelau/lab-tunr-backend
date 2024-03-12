
const { errors } = require('pg-promise')
const db = require('../db/dbConfig.js')

const getAllTunes = async () => {
    try {
        const allTunes = await db.any('SELECT * FROM tunes')
        return allTunes
      } catch (error) {
        return error
      }
    }

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

module.exports = { getAllTunes, getTune, createTune }