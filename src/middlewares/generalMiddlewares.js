const { API_ROUTES } = require("../helpers/constants.js");
const { assembleResponse, assembleErrorResponse, isValidJWT } = require("../helpers/functions");
const { EN } = require("../helpers/messages/english.js");

const checkIncomingJWT = () => {

    try {

        return async (request, response, next) => {

            const { session } = request.headers;

            const incomingJWT = isValidJWT(session);

            if (incomingJWT.error) return response.status(409).json(assembleResponse(true, incomingJWT.msg, { errors: incomingJWT.body.errors }));

            return next();

        }
     
    } catch (error) { return assembleResponse(true, EN.JWT_MAIN_ERROR, { errors: [assembleErrorResponse(EN.MIDDLEWARE, EN.NO_CONTENT, EN.JWT_MAIN_ERROR, API_ROUTES.WORD.GET_ALL_WORDS, EN.MIDDLEWARE)] }); }
}

module.exports = { checkIncomingJWT }