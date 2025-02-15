const { Router } = require('express');
const { check } = require('express-validator');
const { createPhrase, getAllPhrases, updatePhrase, deletePhrase } = require('../controllers/phraseController.js');
const { validateFields } = require('../middlewares/checkFields.js');
const { checkIncomingJWT } = require('../middlewares/generalMiddlewares.js');
const { existPhrase } = require('../middlewares/phraseMiddlewares.js');
const { EN } = require('../helpers/messages/english.js');

const phraseRoutes = Router();

phraseRoutes.post('/create-phrase', [
    check('phrase', EN.PHRASE_IS_EMPTY).not().isEmpty(),
    check('phrase').isLength({ max: 150 }).withMessage(EN.PHRASE_MAX_LENGTH),
    check('meaning', EN.PHRASE_MEANING_IS_EMPTY).not().isEmpty(),
    check('meaning').isLength({ max: 200 }).withMessage(EN.PHRASE_MEANING_MAX_LENGTH),
    check('translation', EN.PHRASE_TRANSLATION_IS_EMPTY).not().isEmpty(),
    check('translation').isLength({ max: 250 }).withMessage(EN.PHRASE_TRANSLATION_MAX_LENGTH),
    checkIncomingJWT(),
    validateFields,
    existPhrase()
], createPhrase );

phraseRoutes.get('/get-all-phrase-by-user', [ checkIncomingJWT() ], getAllPhrases );

phraseRoutes.put('/update-phrase', [ checkIncomingJWT() ], updatePhrase );

phraseRoutes.delete('/delete-phrase', [ checkIncomingJWT() ], deletePhrase );
 
module.exports = { phraseRoutes }
