const { validationResult } = require("express-validator");
const { assembleResponse } = require("../helpers/functions");
const { EN } = require("../helpers/messages/english");

const validateFields = async (request, response, next) => {

    const res = validationResult(request);

    const errorsList = [];

    res.errors.forEach(object => {

        const { type, value, msg, path, location } = object;

        errorsList.push({ type, value, msg, path, location });

    });

    if (!res.isEmpty()) return response.status(401).json(assembleResponse(true, EN.ERROR_401, { errors: errorsList }));

    next();

};

module.exports = {
    validateFields
};