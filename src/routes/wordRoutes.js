const { Router } = require('express');
const { check } = require('express-validator');
const { createWord, getAllWords, getWordsByUserAndPage, updateWord, deleteWord } = require('../controllers/wordController.js');
const { validateFields } = require('../middlewares/checkFields.js');
const { EN } = require('../helpers/messages/english.js');
const { existWord } = require('../middlewares/wordMiddlewares.js');
const { checkIncomingJWT } = require('../middlewares/generalMiddlewares.js');

const wordsRoutes = Router();

wordsRoutes.post('/create-word', [
    check('word', EN.WORD_IS_EMPTY).not().isEmpty(),
    check('word').isLength({ max: 30 }).withMessage(EN.WORD_MAX_LENGTH),
    check('meaning', EN.MEANING_IS_EMPTY).not().isEmpty(),
    check('meaning').isLength({ max: 30 }).withMessage(EN.MEANING_MAX_LENGTH),
    check('noun', EN.NOUN_IS_EMPTY).not().isEmpty(),
    check('noun').isLength({ max: 150 }).withMessage(EN.NOUN_MAX_LENGTH),
    check('preposition', EN.PREPOSITION_IS_EMPTY).not().isEmpty(),
    check('preposition').isLength({ max: 150 }).withMessage(EN.PREPOSITION_MAX_LENGTH),
    check('adverb', EN.ADVERB_IS_EMPTY).not().isEmpty(),
    check('adverb').isLength({ max: 150 }).withMessage(EN.ADVERB_MAX_LENGTH),
    check('adjective', EN.ADJECTIVE_IS_EMPTY).not().isEmpty(),
    check('adjective').isLength({ max: 150 }).withMessage(EN.ADJECTIVE_MAX_LENGTH),
    check('conjunction', EN.CONJUNCTION_IS_EMPTY).not().isEmpty(),
    check('conjunction').isLength({ max: 150 }).withMessage(EN.CONJUNCTION_MAX_LENGTH),
    check('synonyms', EN.SYNONYMS_IS_EMPTY).not().isEmpty(),
    check('synonyms').isLength({ max: 150 }).withMessage(EN.SYNONYMS_MAX_LENGTH),
    check('examples', EN.EXAMPLES_IS_EMPTY).not().isEmpty(),
    check('examples').isLength({ max: 300 }).withMessage(EN.EXAMPLES_MAX_LENGTH),
    validateFields,
    checkIncomingJWT(),
    existWord()
], createWord);

wordsRoutes.get('/get-all-words-by-user', [
    checkIncomingJWT()
], getAllWords);

wordsRoutes.get('/get-words-by-user-and-page', [
], getWordsByUserAndPage);

wordsRoutes.put('/update-word', [
    checkIncomingJWT(),
    existWord(),
], updateWord);

wordsRoutes.delete('/delete-word', [
    checkIncomingJWT()
], deleteWord);


module.exports = { wordsRoutes }