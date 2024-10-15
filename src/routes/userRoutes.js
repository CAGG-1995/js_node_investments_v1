const { Router } = require('express');
const { check } = require('express-validator');
const { signUp } = require('../controllers/userControllers.js');
const { EN } = require('../helpers/messages/english.js');
const { validateFields } = require('../middlewares/checkFields.js');

const usersRoutes = Router();

usersRoutes.post('/signup', [
    check('email', EN.EMAIL_IS_EMPTY).not().isEmpty(),
    validateFields,
], signUp );

module.exports = { usersRoutes }