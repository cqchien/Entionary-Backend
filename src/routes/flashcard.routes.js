const { Router } = require('express');
const { createNewFlashcard } = require('../controllers/flashcard.controller');
const checkToken = require('../middlewares/checkToken.middleware');

const router = Router();

router.use(checkToken);

router.post('/', createNewFlashcard);

module.exports = router;
