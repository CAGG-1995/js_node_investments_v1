const { isValidJWT, createUUID } = require("../helpers/functions.js");
const { insertWordDB } = require("../models/wordModel.js");

const createWord = async (request, response) => {

    const { session, language } = request.headers;    

    try {

        const incomingJWT = isValidJWT(session);

        if (incomingJWT.error) return 0;// check the errors

        const { word = '', meaning = '', noun = '', verb = '', preposition = '', adverb = '', adjective = '', conjunction = '', synonyms = '', examples = '' } = request.body;

        const wordId = createUUID();

        const newWord = await insertWordDB(wordId, incomingJWT.body.data.userId, word.toLowerCase(), meaning.toLowerCase(), noun.toLowerCase(),verb.toLowerCase(), preposition.toLowerCase(), adverb.toLowerCase(), adjective.toLowerCase(), conjunction.toLowerCase(), synonyms.toLowerCase(), examples.toLowerCase());

        console.log(newWord);
        
    } catch (error) {
        console.log('err...' + error);
    }
}

module.exports = {
    createWord
}