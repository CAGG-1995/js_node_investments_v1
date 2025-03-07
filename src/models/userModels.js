require('dotenv').config();
const pool = require('../connection/connection.js');
const { assembleResponse } = require('../helpers/functions.js');

const createUser = async (userId, email, password) => {

    try {

        const record = await pool.query(`INSERT INTO USERS (user_id, email, password) VALUES (?, ?, ?)`, [userId, email, password]);

        if (record.length > 0) return assembleResponse(false, 'Created' , record);

        return assembleResponse(true, 'Internal Server Error', {});

    } catch (error) { return assembleResponse(true, error.message, {stack}); }
}

const selectUserByEmail = async (email) => {

    try {

        const record = await pool.query(`SELECT * FROM USERS WHERE email = ?`, [email]);

        if (record.length > 0) return assembleResponse(false, 'Select' , record[0]);

        return assembleResponse(true, 'Internal Server Error', {});
        
    } catch (error) { return assembleResponse(true, error.message, {stack}); }
}

module.exports = {
    createUser,
    selectUserByEmail
}