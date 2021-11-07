const { Router } = require('express');
const { createNewFlashcard, getFlashcards } = require('../controllers/flashcard.controller');
const checkToken = require('../middlewares/checkToken.middleware');
const validate = require('../middlewares/validate.middleware');
const { createNewFlashcardValidationSchema, getFlashcardsValidationSchema } = require('../validations/flashcard.validation');

const router = Router();

router.use(checkToken);

router.post('/', validate(createNewFlashcardValidationSchema), createNewFlashcard);
router.get('/', validate(getFlashcardsValidationSchema), getFlashcards);

module.exports = router;
