require("dotenv").config();

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const assembleResponse = (error = false, msg = "Success", body = {}) => { return { error, msg, body }};

const destructuringErrors = (error) => error.stack.split('\n');

const createdUUID = () => {

    let dt = new Date().getTime();

    const uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
    
    return uuid;
}

const decodePassword = (password) => { return Buffer.from(password, "base64").toString("utf8"); }

const encryptPassword = async (string) => {

    const SALT = bcrypt.genSaltSync(10);

    return await bcrypt.hash(string, SALT);
};

const createJWT = async (userId, email, password) => {

    const payload = { userId, email, password };

    return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

const isValidEmail = (email) => {

    const regex = EMAIL_RAGEX;

    return regex.test(email);
};

module.exports = {
    assembleResponse,
    destructuringErrors,
    createdUUID,
    decodePassword,
    encryptPassword,
    createJWT,
    isValidEmail
}