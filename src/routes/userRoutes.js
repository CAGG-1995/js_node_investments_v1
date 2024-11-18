const { Router } = require('express');
const { check } = require('express-validator');
const { signUp, login } = require('../controllers/userControllers.js');
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
    check('password').isLength({ max: 60 }).withMessage('Only 60 characters are allowed for the password'),
    validateFields,
    existUser(false)
], signUp );

usersRoutes.post('/login', [
    check('email', EN.EMAIL_IS_EMPTY).not().isEmpty(),
    check('email').isLength({ max: 50 }).withMessage('Only 50 characters are allowed for the email'),
    check('email').custom(value => isValidEmail(value)).withMessage(EN.EMAIL_BAD_FORMAT),
    check('password', EN.PASSWORD_IS_EMPTY).not().isEmpty(),
    check('password').isLength({ max: 60 }).withMessage('Only 60 characters are allowed for the password'),
    validateFields,
    existUser(true)
], login );

module.exports = { usersRoutes }