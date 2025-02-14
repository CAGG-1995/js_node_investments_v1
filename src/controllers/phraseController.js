const { assembleResponse, isValidJWT, createUUID } = require("../helpers/functions.js");
const { EN } = require("../helpers/messages/english");
const { insertPhraseDB } = require("../models/phraseModel.js");

const createPhrase = async (request, response) => { 

    try {

        const { session } = request.headers;    

        const incomingJWT = isValidJWT(session);

        if (incomingJWT.error) return 0;// check the errors

        const { phrase, meaning, translation } = request.body;

        const phraseId = createUUID();

        const newPHRASE = await insertPhraseDB(phraseId, incomingJWT.body.data.userId, phrase.toLowerCase(), meaning.toLowerCase(), translation.toLowerCase());

        return response.status(200).json(assembleResponse(false, newPHRASE.msg, {
            phrase: { phrase_id: phraseId, meaning, translation },
        }));

    } catch (error) {
        
        return response.status(500).json(assembleResponse(false, error.message || EN.ERROR_MSG_500, {}));
        
    }
}
getAllPhrases = async () => { 
    
    try {
    
    } catch (error) {
    
    }
}

updatePhrase = async () => { 
    
    try {
    
    } catch (error) {
    
    }
}

deletePhrase = async () => { 
    
    try {
    
    } catch (error) {
    
    }
}

module.exports = {
    createPhrase,
    getAllPhrases,
    updatePhrase,
    deletePhrase 
}