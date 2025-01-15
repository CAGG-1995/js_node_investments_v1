const EMAIL_RAGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTAINS_BLANK_SPACES = /\s/;
const API_ROUTES = {
  WORD: {
    CREATE_WORD: '/api/v1/words/create-word'
  }
}

module.exports = { 
  EMAIL_RAGEX,
  CONTAINS_BLANK_SPACES,
  API_ROUTES
};