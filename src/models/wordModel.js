require("dotenv").config();

const pool = require('../connection/connection.js');
const { API_ROUTES } = require("../helpers/constants.js");
const { assembleResponse, assembleErrorResponse } = require("../helpers/functions.js");
const { EN } = require("../helpers/messages/english.js");

const insertWordDB = async (word_id, user_id, word, meaning, noun, verb, preposition, adverb, adjective, conjunction, synonyms, examples) => {

    try {

        const record = await pool.query(`INSERT INTO WORDS (word_id, user_id, word, meaning, noun, verb, preposition, adverb, adjective, conjunction, synonyms, examples) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [word_id, user_id, word, meaning, noun, verb, preposition, adverb, adjective, conjunction, synonyms, examples]);

        return assembleResponse(false, EN.WORD_HAS_BEEN_INSERTED, { data: record });

    } catch (error) {

        return assembleResponse(true, EN.WORD_INSERT_ERROR, { errors: [assembleErrorResponse(EN.QUERY, EN.NO_CONTENT, API_ROUTES.WORD.CREATE_WORD, error.message || error.WORD_FIND_ERROR, EN.ERROR_QUERY_LOCATION )]});
    }
}

const findWord = async (userId, word) => {

    try {

        const record = await pool.query(`SELECT word FROM WORDS WHERE user_id = ? AND word = ?`, [userId, word]);

        return assembleResponse(false, EN.WORD_HAS_BEEN_FOUND, { data: record });

    } catch (error) {

        return assembleResponse(true, EN.WORD_FIND_ERROR, { errors: [assembleErrorResponse(EN.QUERY, EN.NO_CONTENT, error.message || error.WORD_INSERT_ERROR, API_ROUTES.WORD.CREATE_WORD, EN.ERROR_QUERY_LOCATION )] });
    }
}


const selectAllWords = async (user_id) => {

    try {
  
        const records = await pool.query(`SELECT * FROM WORDS WHERE user_id = ? ORDER BY word ASC`, [user_id]);
    
        return assembleResponse(false, 'langs.SUCCESS_MSG_200', { records: records[0] });
            
    } catch (error) {console.log(error); }
}

const selectWordsByUserAndPage = async (user_id, limit, offset, langs) => {

    try {
  
        const records = await pool.query(`SELECT * FROM WORDS WHERE user_id = ? ORDER BY word ASC LIMIT ? OFFSET ?`, [user_id, Number(limit), Number(offset)]);
    
        return assembleResponse(false, 'langs.SUCCESS_MSG_200', { records: records[0] });
            
    } catch (error) {console.log(error); }
}

const updateWordDB = async (user_id, word_id, word, meaning, noun, verb, preposition, adverb, adjective, conjunction, synonyms, examples) => {

    try {

        const query = `UPDATE WORDS SET user_id = ?, word = ?, meaning = ?, noun = ?, verb = ?, preposition = ?, adverb = ?, adjective = ?, conjunction = ?, synonyms = ?, examples = ? WHERE word_id = ?`;

        const record = await pool.query(query, [user_id, word, meaning, noun, verb, preposition, adverb, adjective, conjunction, synonyms, examples, word_id]);

        return assembleResponse(false, 'EN.WORD_HAS_BEEN_UPDATED', { record: record });

    } catch (error) {
        console.log(error);
        
    }
};

const deleteWordDB = async (word_id,) => {

    try { console.log('newWord');

        const query = `DELETE FROM WORDS WHERE word_id = ?`;

        const record = await pool.query(query, [word_id]);

        return assembleResponse(false, 'EN.WORD_HAS_BEEN_UPDATED', { record: record });

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    insertWordDB,
    findWord,
    selectAllWords,
    selectWordsByUserAndPage,
    updateWordDB,
    deleteWordDB
}