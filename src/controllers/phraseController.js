const { assembleResponse, isValidJWT, createUUID } = require("../helpers/functions.js");
const { EN } = require("../helpers/messages/english");
const { insertPhraseDB, selectAllPhrases, updatePhraseDB } = require("../models/phraseModel.js");

const createPhrase = async (request, response) => { 

    try {

        const { session } = request.headers;    

        const incomingJWT = isValidJWT(session);

        if (incomingJWT.error) return 0;// check the errors

        const { phrase, meaning, translation } = request.body;

        const phraseId = createUUID();

        const newPHRASE = await insertPhraseDB(incomingJWT.body.data.userId, phraseId, phrase.toLowerCase(), meaning.toLowerCase(), translation.toLowerCase());

        return response.status(200).json(assembleResponse(false, newPHRASE.msg, {
            phrase: { phrase_id: phraseId, meaning, translation },
        }));

    } catch (error) { return response.status(500).json(assembleResponse(false, error.message || EN.ERROR_MSG_500, {})); }
}

const getAllPhrases = async (request, response) => { 

    try {

        const { session } = request.headers;

        const incomingJWT = isValidJWT(session); // change for a method that check the incoming jwt

        // if (incomingJWT.error) return 0;// check the errors

        const listPhrases = await selectAllPhrases(incomingJWT.body.data.userId);

        return response.status(200).json(assembleResponse(false, listPhrases.msg, { records: listPhrases.body.records }));

    
    } catch (error) { return response.status(500).json(assembleResponse(false, error.message || EN.ERROR_MSG_500, {})); }
}

const updatePhrase = async (request, response) => { 
    
    try {

        const { phrase_id } = request.headers;

        const { phrase, meaning, translation } = request.body;

        const newPhrase = await updatePhraseDB(phrase_id, phrase.toLowerCase(), meaning.toLowerCase(), translation.toLowerCase());
        
        return response.status(201).json(assembleResponse(false, newPhrase.msg, {
            phrase: { phrase_id, phrase, meaning, translation }
        }));

    } catch (error) { return response.status(500).json(assembleResponse(false, error.message || EN.ERROR_MSG_500, {})); }
}

const deletePhrase = async (request, response) => { 
    
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