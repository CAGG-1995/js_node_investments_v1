const { API_ROUTES } = require("../helpers/constants");
const { assembleResponse, assembleErrorResponse, isValidJWT } = require("../helpers/functions.js");
const { EN } = require("../helpers/messages/english.js");
const { findWord } = require("../models/wordModel.js");

const existWord = () => {

    try {

        return async (request, response, next) => {

            const { session } = request.headers;
            const { word } = request.body;

            const incomingJWT = isValidJWT(session);
            
            if (incomingJWT.error) return response.status(409).json(assembleResponse(true, incomingJWT.msg, { errors: incomingJWT.body.errors }));

            const exist = await findWord(incomingJWT.body.data.userId, word);

            if (exist.error) return response.status(409).json(assembleResponse(true, exist.msg, { errors: exist.body.errors }));

            if (exist.body.data[0].length > 0) return response.status(409).json(
                assembleResponse (true, EN.WORD_EXIST, {
                    errors: [assembleErrorResponse(EN.TYPE, word, EN.WORD_EXIST, API_ROUTES.WORD.CREATE_WORD, EN.BODY)]
                }
            ));

            return next();
        }
 
    } catch (error) { return assembleResponse(true, WORD_FIND_ERROR, { errors: [assembleErrorResponse(EN.METHOD, EN.NO_CONTENT, EN.WORD_FIND_ERROR, API_ROUTES.WORD.CREATE_WORD, EN.MIDDLEWARE)] }); }
}

module.exports = {
    existWord
}