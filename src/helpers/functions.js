require('dotenv').config();

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { EMAIL_RAGEX, API_ROUTES } = require('./constants');
const { EN } = require('./messages/english');


const JWT_SECRET = process.env.JWT_SECRET;

const assembleResponse = (error = false, msg = 'Success', body = {}) => { return { error, msg, body }};

const assembleErrorResponse = (type = 'field', value = '', msg = 'default error', path = '/', location = 'body') => { return { type, value, msg, path, location }};

const destructuringErrors = (error) => error.stack.split('\n');

const createUUID = () => {

    let dt = new Date().getTime();

    const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    
    return uuid;
}

const decodePassword = password => { return Buffer.from(password, 'base64').toString('utf8'); }

const encryptPassword = async password => {

    const SALT = bcrypt.genSaltSync(10);

    return await bcrypt.hash(password, SALT);
};

const compareHash = async (password, hash) => { return await bcrypt.compare(password, hash) }

const createJWT = async (userId, email, password) => {

    const payload = { userId, email, password };

    return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

const isValidEmail = (email) => {

    const regex = EMAIL_RAGEX;

    return regex.test(email);
};

const isValidJWT = (token) => {

    try {

        const { userId, email, password, iat, exp } = jsonwebtoken.verify(token, JWT_SECRET);

        return assembleResponse(false, EN.SUCCESS, { data: { userId, email, password, iat, exp } });
        
    } catch (error) {
    
        return assembleResponse(true, error.message || EN.DEFAULT_TOKEN_ERROR, { errors: [assembleErrorResponse('token', 'No content', API_ROUTES.WORD.CREATE_WORD, error.message + ' - ' + error.name + ' - ' + error.expiredAt)] });
    }
} 

module.exports = {
    assembleResponse,
    assembleErrorResponse,
    destructuringErrors,
    createUUID,
    decodePassword,
    encryptPassword,
    compareHash,
    createJWT,
    isValidEmail,
    isValidJWT
}