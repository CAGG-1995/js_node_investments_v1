const { Router } = require('express');
const { check } = require('express-validator');
const { signUp } = require('../controllers/userControllers.js');

const usersRoutes = Router();

usersRoutes.post('/signup', [], signUp );

module.exports = { usersRoutes }