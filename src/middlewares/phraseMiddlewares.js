const { API_ROUTES } = require("../helpers/constants");
const { assembleResponse, assembleErrorResponse, isValidJWT } = require("../helpers/functions.js");
const { EN } = require("../helpers/messages/english.js");
const { findPhrase } = require("../models/phraseModel.js");

const existPhrase = () => {

    try {

        return async (request, response, next) => {

            const { session } = request.headers;

            const { phrase } = request.body;

            const incomingJWT = isValidJWT(session);

            if (incomingJWT.error) return response.status(409).json(assembleResponse(true, incomingJWT.msg, { errors: incomingJWT.body.errors }));

            const exist = await findPhrase(incomingJWT.body.data.userId, phrase);

            if (exist.error) return response.status(409).json(assembleResponse(true, exist.msg, { errors: exist.body.errors }));

            if (exist.body.record[0].length > 0) return response.status(409).json(
                assembleResponse (true, EN.PHRASE_EXIST, {
                    errors: [assembleErrorResponse(EN.TYPE, phrase, EN.PHRASE_EXIST, API_ROUTES.PHRASE.CREATE_PHRASE, EN.BODY)]
                }
            ));

            return next();
        }

    } catch (error) { return assembleResponse(true, PHRASE_FIND_ERROR, { errors: [assembleErrorResponse(EN.METHOD, EN.NO_CONTENT, EN.PHRASE_FIND_ERROR, API_ROUTES.PHRASE.CREATE_PHRASE, EN.MIDDLEWARE)] }); }
}

module.exports = {
    existPhrase
}