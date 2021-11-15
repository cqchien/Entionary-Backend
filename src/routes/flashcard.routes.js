const { Router } = require('express');
const {
  createNewFlashcard,
  getFlashcards,
  getDetailFlashcard,
  addWordToFlashcard,
} = require('../controllers/flashcard.controller');
const checkToken = require('../middlewares/checkToken.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createNewFlashcardValidationSchema,
  getFlashcardsValidationSchema,
  getDetailFlashcardValidationSchema,
  addWordToFlashcardValidationSchema,
} = require('../validations/flashcard.validation');

const router = Router();

router.use(checkToken);

router.post('/', validate(createNewFlashcardValidationSchema), createNewFlashcard);
router.get('/', validate(getFlashcardsValidationSchema), getFlashcards);
router.get('/:flashcardId', validate(getDetailFlashcardValidationSchema), getDetailFlashcard);

router.patch('/:flashcardId/word', validate(addWordToFlashcardValidationSchema), addWordToFlashcard);
module.exports = router;
