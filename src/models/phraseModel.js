require("dotenv").config();

const pool = require('../connection/connection.js');
const { API_ROUTES } = require("../helpers/constants.js");
const { assembleResponse, assembleErrorResponse } = require("../helpers/functions.js");
const { EN } = require("../helpers/messages/english.js");

const insertPhraseDB = async (user_id, phrase_id, phrase, meaning, translation) => {

    try {

        const record = await pool.query(`INSERT INTO PHRASE (user_id, phrase_id, phrase, meaning, translation) VALUES (?, ?, ?, ?, ?)`, [user_id, phrase_id, phrase, meaning, translation]);

        return assembleResponse(false, EN.PHRASE_HAS_BEEN_INSERTED, { data: record });
        
    } catch (error) {

        return assembleResponse(true,  error.message || EN.ERROR_MSG_500, { errors: [assembleErrorResponse(EN.QUERY, { user_id, phrase_id, phrase, meaning, translation }, API_ROUTES.PHRASE.CREATE_PHRASE, error.message || error.PHRASE_INSERT_ERROR, EN.ERROR_QUERY_LOCATION)] });
    }
}

const findPhrase = async (userId, phrase) => {

    try {

        const record = await pool.query(`SELECT phrase FROM PHRASE WHERE user_id = ? AND phrase = ?`, [userId, phrase]);

        return assembleResponse(false, EN.PHRASE_HAS_BEEN_FOUND, { record });

    } catch (error) { return assembleResponse(true, error.message || EN.ERROR_MSG_500, { errors: [assembleErrorResponse(EN.QUERY, EN.NO_CONTENT, error.message || error.PHRASE_FIND_ERROR, API_ROUTES.PHRASE.CREATE_PHRASE, EN.ERROR_QUERY_LOCATION )] }); }
}

const selectAllPhrases = async (user_id) => {

    try {

        const records = await pool.query(`SELECT * FROM PHRASE WHERE user_id = ? ORDER BY phrase ASC`, [user_id]);

        return assembleResponse(false, EN.PHRASE_ALL_HAS_BEEN_SELECTED, { records: records[0] });

    } catch (error) { return assembleResponse(true, error.message || EN.ERROR_MSG_500, { errors: [assembleErrorResponse(EN.QUERY, EN.NO_CONTENT, error.message || error.PHRASE_ERROR_SELECTING_ALL, API_ROUTES.PHRASE.GET_ALL_PHRASE, EN.ERROR_QUERY_LOCATION )] }); }
}

const updatePhraseDB = async (phrase_id, phrase, meaning, translation) => {

    try {

        const query = `UPDATE PHRASE SET phrase = ?, meaning = ?, translation = ? WHERE phrase_id = ?`;

        const record = await pool.query(query, [phrase, meaning, translation, phrase_id]);

        return assembleResponse(false, EN.PHRASE_HAS_BEEN_UPDATED, { record: record });

    } catch (error) {
        
    }
}

module.exports = {
    insertPhraseDB,
    findPhrase,
    selectAllPhrases,
    updatePhraseDB
}