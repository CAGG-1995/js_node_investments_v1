
const signUp = async (request, response) => {

    try {

        return response.status(200).json(assembleResponse(true, 500, 'OK', { session: true } ));
        
    } catch (error) {

        return response.status(500).json(assembleResponse(true, 500, error.message, { errors:  stack } ));
    }
}

module.exports = {
    signUp
}