const { isValidJWT, createUUID, assembleResponse } = require("../helpers/functions.js");
const { insertWordDB, selectWordsByUserAndPage, selectAllWords } = require("../models/wordModel.js");

const createWord = async (request, response) => {

    try {

        const { session } = request.headers;    

        const incomingJWT = isValidJWT(session);

        if (incomingJWT.error) return 0;// check the errors

        const { word = '', meaning = '', noun = '', verb = '', preposition = '', adverb = '', adjective = '', conjunction = '', synonyms = '', examples = '' } = request.body;

        const wordId = createUUID();

        const newWord = await insertWordDB(wordId, incomingJWT.body.data.userId, word.toLowerCase(), meaning.toLowerCase(), noun.toLowerCase(),verb.toLowerCase(), preposition.toLowerCase(), adverb.toLowerCase(), adjective.toLowerCase(), conjunction.toLowerCase(), synonyms.toLowerCase(), examples.toLowerCase());

        return response.status(200).json(assembleResponse(false, newWord.msg, {
            word: { word, wordId, meaning, noun, verb, preposition, adverb, adjective,conjunction, synonyms, examples }
        }));
        
    } catch (error) {
        console.log('err...' + error);
    }
}

const getAllWords = async (request, response) => {

    try {

        const { session } = request.headers;

        const incomingJWT = isValidJWT(session); // change for a method that check the incoming jwt

        // if (incomingJWT.error) return 0;// check the errors

        const listWords = await selectAllWords(incomingJWT.body.data.userId);

        return response.status(200).json(assembleResponse(false, listWords.msg, { records: listWords.body.records }));

    } catch (error) {
        return response.status(200).json(assembleResponse(false, listWords.msg, { records: listWords.body.records }));
        
    }
}

const getWordsByUserAndPage = async (request, response) => {

    try {

        const { session, limit, offset } = request.headers;

        const incomingJWT = isValidJWT(session);

        if (incomingJWT.error) return 0;// check the errors

        const listWords = await selectWordsByUserAndPage(incomingJWT.body.data.userId, limit, offset);

        return response.status(200).json(assembleResponse(false, listWords.msg, { records: listWords.body.records }));
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    createWord,
    getAllWords,
    getWordsByUserAndPage
}