const { isValidJWT, createUUID, assembleResponse } = require("../helpers/functions.js");
const { insertWordDB, selectWordsByUserAndPage } = require("../models/wordModel.js");

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

const getWordsByUserAndPage = async (request, response) => {

    try {

        const { session, limit, offset } = request.headers;

        const incomingJWT = isValidJWT(session);

        if (incomingJWT.error) return 0;// check the errors

        const listWords = await selectWordsByUserAndPage(incomingJWT.body.data.userId, limit, offset);

        console.log(listWords);
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    getWordsByUserAndPage,
    createWord
}