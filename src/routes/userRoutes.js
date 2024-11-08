const { Router } = require('express');
const { check } = require('express-validator');
const { signUp } = require('../controllers/userControllers.js');
const { EN } = require('../helpers/messages/english.js');
const { validateFields } = require('../middlewares/checkFields.js');
const { existUser } = require('../middlewares/userMiddlewares.js');
const { isValidEmail } = require('../helpers/functions.js');


const usersRoutes = Router();

usersRoutes.post('/signup', [
    check('email', EN.EMAIL_IS_EMPTY).not().isEmpty(),
    check('email').isLength({ max: 50 }).withMessage('Only 50 characters are allowed for the email'),
    check('email').custom(value => isValidEmail(value)).withMessage(EN.EMAIL_BAD_FORMAT),
    check('password', EN.PASSWORD_IS_EMPTY).not().isEmpty(),
    validateFields,
    existUser(false)
], signUp );

module.exports = { usersRoutes }