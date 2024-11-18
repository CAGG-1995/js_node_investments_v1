const { assembleResponse, destructuringErrors, decodePassword, createdUUID, encryptPassword, createJWT, compareHash } = require('../helpers/functions.js');
const { EN } = require('../helpers/messages/english.js');
const { createUser, selectUserByEmail } = require('../models/userModels.js')

const signUp = async (request, response) => {

    try {

        const { email, password } = request.body;
        const UUID = createdUUID();
        const DECODED_PASSWORD = decodePassword(password);
        const ENCRYPT_PASSWORD = await encryptPassword(DECODED_PASSWORD);
        const CREATE_USER = await createUser(UUID, email, ENCRYPT_PASSWORD);
        const jwt = await createJWT(UUID, email, encryptPassword);

        return response.status(201).json(assembleResponse(false, 'OK', { jwt } ));
        
    } catch (error) {

        return response.status(500).json(assembleResponse(true, error.message, { errors:  destructuringErrors(error) } ));
    }
}

const login = async (request, response) => {

    try {

        const { email, password } = request.body;
        const { body } = await selectUserByEmail(email);  console.log(body[0].user_id);
        const passwordDecode = decodePassword(password);
        const passwordEncrypt = await encryptPassword(passwordDecode);
        const hash = await compareHash(passwordDecode, body[0].password);
        const jwt = await createJWT(body[0].user_id, body[0].email, passwordEncrypt);

        if (hash) return response.status(200).json(assembleResponse(false, 'OK', { jwt, idUser: body[0].user_id }));

        else return response.status(404).json(assembleResponse(true, EN.PASSWORD_IS_INCORRECT, {})); 
        
    } catch (error) {

        return response.status(500).json(assembleResponse(true, error.message, { errors:  destructuringErrors(error) } ));
    }
}

module.exports = {
    signUp,
    login
}