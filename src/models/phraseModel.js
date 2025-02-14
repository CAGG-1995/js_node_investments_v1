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

        return assembleResponse(true, EN.PHRASE_INSERT_ERROR, { errors: [assembleErrorResponse(EN.QUERY, { user_id, phrase_id, phrase, meaning, translation }, API_ROUTES.PHRASE.CREATE_PHRASE, error.message || error.PHRASE_INSERT_ERROR, EN.ERROR_QUERY_LOCATION)] });
    }
}

const findPhrase = async (userId, phrase) => {

    try {

        const record = await pool.query(`SELECT phrase FROM PHRASE WHERE user_id = ? AND phrase = ?`, [userId, phrase]);

        return assembleResponse(false, EN.PHRASE_HAS_BEEN_FOUND, { record });

    } catch (error) {

        return assembleResponse(true, EN.WORD_FIND_ERROR, { errors: [assembleErrorResponse(EN.QUERY, EN.NO_CONTENT, error.message || error.WORD_INSERT_ERROR, API_ROUTES.WORD.CREATE_WORD, EN.ERROR_QUERY_LOCATION )] });
    }
}

module.exports = {
    insertPhraseDB,
    findPhrase
}