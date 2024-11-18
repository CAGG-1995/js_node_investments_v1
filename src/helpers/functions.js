require("dotenv").config();

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { EMAIL_RAGEX } = require("./constants");

const JWT_SECRET = process.env.JWT_SECRET;

const assembleResponse = (error = false, msg = "Success", body = {}) => { return { error, msg, body }};

const assembleErrorResponse = (type = "field", value = "", msg = "default error", path = "/", location = "body") => { return { type, value, msg, path, location }};

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

const decodePassword = password => { return Buffer.from(password, "base64").toString("utf8"); }

const encryptPassword = async password => {

    const SALT = bcrypt.genSaltSync(10);

    return await bcrypt.hash(password, SALT);
};

const compareHash = async (password, hash) => { return await bcrypt.compare(password, hash) }

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
    assembleErrorResponse,
    destructuringErrors,
    createdUUID,
    decodePassword,
    encryptPassword,
    compareHash,
    createJWT,
    isValidEmail
}