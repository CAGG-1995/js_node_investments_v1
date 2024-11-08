const { assembleResponse, destructuringErrors, decodePassword, createdUUID, encryptPassword, createJWT } = require('../helpers/functions.js');
const { createUser } = require('../models/userModels.js')

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

module.exports = {
    signUp
}