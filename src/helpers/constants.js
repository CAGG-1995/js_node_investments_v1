const EMAIL_RAGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTAINS_BLANK_SPACES = /\s/;
const API_ROUTES = {
    WORD: {
        CREATE_WORD: '/api/v1/words/create-word',
        GET_ALL_WORDS: 'api/v1/words/get-all-words-by-user',
    },
    PHRASE: {
        CREATE_PHRASE: '/api/v1/phrase/create-phrase',
    }
}

module.exports = { 
    EMAIL_RAGEX,
    CONTAINS_BLANK_SPACES,
    API_ROUTES
};