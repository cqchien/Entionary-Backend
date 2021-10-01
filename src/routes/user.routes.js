const { Router } = require('express');

const router = Router();

router.get('/me', (req, res, next) => console.log('me'));

module.exports = router;
