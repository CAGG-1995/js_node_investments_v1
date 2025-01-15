require("dotenv").config();
const pool = require('../connection/connection.js');
const { API_ROUTES } = require("../helpers/constants.js");
const { assembleResponse, assembleErrorResponse } = require("../helpers/functions.js");
const { EN } = require("../helpers/messages/english.js");

const insertWordDB = async (word_id, user_id, word, meaning, noun, verb, preposition, adverb, adjective, conjunction, synonyms, examples, langs) => {

    try {

        const record = await pool.query(`INSERT INTO WORDS (word_id, user_id, word, meaning, noun, verb, preposition, adverb, adjective, conjunction, synonyms, examples) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [word_id, user_id, word, meaning, noun, verb, preposition, adverb, adjective, conjunction, synonyms, examples]);

        return assembleResponse(false, EN.WORD_HAS_BEEN_INSERTED, { data: record });

    } catch (error) {

        return assembleResponse(true, EN.WORD_INSERT_ERROR, { errors: [assembleErrorResponse('query', 'No content', API_ROUTES.WORD.CREATE_WORD, error.message || error.message)] });

    }
}

module.exports = {
    insertWordDB
}