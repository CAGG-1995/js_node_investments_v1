const { assembleResponse } = require("../helpers/functions");
const { EN } = require("../helpers/messages/english");
const { selectUserByEmail } = require("../models/userModels");


const existUser = (isLogin) => {

    try {

        return async (request, response, next) => {

            const { email } = request.body;

            const existEmail = await selectUserByEmail(email);

            if (isLogin) {


            } else {

                if (existEmail.body.length > 0) return response.status(409).json(assembleResponse(true, 'Conflict', {
                    errosList: [{ msg: EN.EMAIL_EXIST }]
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