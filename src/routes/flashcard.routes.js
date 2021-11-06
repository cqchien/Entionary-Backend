const { Router } = require('express');
const { createNewFlashcard, getAllFlashcards } = require('../controllers/flashcard.controller');
const checkToken = require('../middlewares/checkToken.middleware');
const validate = require('../middlewares/validate.middleware');
const createNewFlashcardValidationSchema = require('../validations/flashcard.validation');

const router = Router();

router.use(checkToken);

router.post('/', validate(createNewFlashcardValidationSchema), createNewFlashcard);
router.get('/', getAllFlashcards);

module.exports = router;
