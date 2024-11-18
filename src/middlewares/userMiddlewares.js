const { assembleResponse, assembleErrorResponse } = require("../helpers/functions");
const { EN } = require("../helpers/messages/english");
const { selectUserByEmail } = require("../models/userModels");


const existUser = (isLogin) => {

    try {

        return async (request, response, next) => {

            const { email } = request.body;

            const existEmail = await selectUserByEmail(email);

            if (isLogin) {

                if (existEmail.body.length === 0) return response.status(200).json(assembleResponse(true, 'OK', {
                    errosList: [
                        assembleErrorResponse('field', email, 'The email it is not registered.', 'users/login', 'body')
                    ]
                }));

            } else {

                if (existEmail.body.length > 0) return response.status(409).json(assembleResponse(true, 'Conflict', {
                    errosList: [
                        assembleErrorResponse('field', email, 'The email it is already registered.', 'users/signup', 'body')
                    ]
                }));

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