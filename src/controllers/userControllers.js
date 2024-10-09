const { assembleResponse, destructuringErrors, decodePassword, createdUUID, encryptPassword } = require('../helpers/functions.js');
const { createUser } = require('../models/userModels.js')

const signUp = async (request, response) => {

    try {

        const { email, password } = request.body;
        const UUID = createdUUID();
        const DECODED_PASSWORD = decodePassword(password);
        const ENCRYPT_PASSWORD = await encryptPassword(DECODED_PASSWORD);
        const CREATE_USER = await createUser(UUID, email, ENCRYPT_PASSWORD);

        console.log(CREATE_USER);
        


        return response.status(201).json(assembleResponse(false, 'OK', { email, password, UUID, DECODED_PASSWORD, ENCRYPT_PASSWORD } ));
        
    } catch (error) {

        return response.status(500).json(assembleResponse(true, error.message, { errors:  destructuringErrors(error) } ));
    }
}

module.exports = {
    signUp
}