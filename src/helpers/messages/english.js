const EN = {
    CREATED: 'Created',
    SUCCESS: 'Success',
    UPDATE: 'UPDATE',
    PROBLEM: 'Problem',
    WARNING: 'Warning',
    ERROR: 'Error',
    MSG_200: '200 OK',
    QUERY: 'Query',
    MIDDLEWARE: 'Middleware',
    BODY: 'Body',
    TYPE: 'Field',
    NO_CONTENT: 'No content',
    METHOD: 'Method',
    // ERRORS
    ERROR_MSG_400: '400 - Bad Request',
    ERROR_MSG_401: '401 - Unauthorized',
    ERROR_MSG_500: '500 - Internal Server Error',
    ERROR_QUERY_LOCATION: 'MYSQL queries',
    DEFAULT_TOKEN_ERROR: 'Your session has expired or the token is invalid. Please log in again to continue.',

    // SESSION
    EMAIL_IS_EMPTY: 'The email field is required and cannot contain blank spaces.',
    EMAIL_EXIST: 'This response is sent when a request conflicts with the current state of the server. In WebDAV remote web authoring, 409 responses are errors sent to the client so that a user might be able to resolve a conflict and resubmit the request.',
    EMAIL_BAD_FORMAT: 'The email format is invalid.',
    PASSWORD_IS_EMPTY: 'The password field is required and cannot contain blank spaces.',
    PASSWORD_IS_INCORRECT: 'The email exist but the password is incorrect.',

    // JWT

    JWT_MAIN_ERROR: 'An unexpected error occurred while evaluating the jwt.',

    // WORD
    WORD_IS_EMPTY: 'The word field is required and cannot contain blank spaces',
    WORD_MAX_LENGTH: 'The Word parameter exceeds maximum length of 30 characters',
    WORD_EXIST: 'This word is already registered',
    WORD_NOT_EXIST: 'This word not exist',
    WORDS_LIST_ARE_EMPTY: 'The words list it is empty',
    WORD_DELETE_MSG: 'The word has been removed',
    WORD_HAS_BEEN_INSERTED: 'The word has been created in the database.',
    WORD_INSERT_ERROR: 'An error occurred while trying to insert the word.',
    WORD_FIND_ERROR: 'An error occurred while trying to find the word.',
    WORD_HAS_BEEN_FOUND: 'the word has been found',
    MEANING_IS_EMPTY: 'The meaning field is required and cannot contain blank spaces',
    MEANING_MAX_LENGTH: 'The meaning parameter exceeds maximum length of 30 characters',
    MEANING_IS_EMPTY: 'The meaning field is required and cannot contain blank spaces',
    MEANING__MAX_LENGTH: 'The meaning parameter exceeds maximum length of 30 characters',
    NOUN_IS_EMPTY: 'The noun field is required and cannot contain blank spaces',
    NOUN_MAX_LENGTH: 'The noun parameter exceeds maximum length of 150 characters',
    VERB_IS_EMPTY: 'The verb field is required and cannot contain blank spaces',
    VERB_MAX_LENGTH: 'The verb parameter exceeds maximum length of 150 characters',
    PREPOSITION_IS_EMPTY: 'The preposition field is required and cannot contain blank spaces',
    PREPOSITION_MAX_LENGTH: 'The preposition parameter exceeds maximum length of 150 characters',
    ADVERB_IS_EMPTY: 'The adverb field is required and cannot contain blank spaces',
    ADVERB_MAX_LENGTH: 'The adverb parameter exceeds maximum length of 150 characters',
    ADJECTIVE_IS_EMPTY: 'The adjective field is required and cannot contain blank spaces',
    ADJECTIVE_MAX_LENGTH: 'The adjective parameter exceeds maximum length of 150 characters',
    CONJUNCTION_IS_EMPTY: 'The conjunction field is required and cannot contain blank spaces',
    CONJUNCTION_MAX_LENGTH: 'The conjunction parameter exceeds maximum length of 150 characters',
    SYNONYMS_IS_EMPTY: 'The synonyms field is required and cannot contain blank spaces',
    SYNONYMS_MAX_LENGTH: 'The synonyms parameter exceeds maximum length of 150 characters',
    EXAMPLES_IS_EMPTY: 'The examples field is required and cannot contain blank spaces',
    EXAMPLES_MAX_LENGTH: 'The examples parameter exceeds maximum length of 300 characters',
    HAS_BLANK_SPACES: 'contains blank spaces',

}

module.exports = { EN }