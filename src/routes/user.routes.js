const { Router } = require('express');
const checkToken = require('../middlewares/checkToken.middleware');

const router = Router();

router.use(checkToken);

router.get('/me', (req, res, next) => console.log('me'));

module.exports = router;
