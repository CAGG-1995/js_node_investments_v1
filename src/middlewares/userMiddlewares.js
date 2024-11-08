const { assembleResponse } = require("../helpers/functions");
const { selectUserByEmail } = require("../models/userModels");


const existUser = (isLogin) => {

    try {

        return async (request, response, next) => {

            const { email } = request.body;

            const existEmail = await selectUserByEmail(email);

            if (isLogin) {


            } else {

                if (existEmail.body.length > 1) return response.status(409).json(assembleResponse(true, 'Conflict', {
                    errosList: [{msg: 'This response is sent when a request conflicts with the current state of the server. In WebDAV remote web authoring, 409 responses are errors sent to the client so that a user might be able to resolve a conflict and resubmit the request.'}]
                } ));

            }

            return next();
        }
        
    } catch (error) {

        return response.status(201).json(assembleResponse(true, 'OK', {} ));

    }
}

module.exports = {
    existUser
}