const { Router } = require('express');
const { getUserDetail } = require('../controllers/user.controller');
const checkToken = require('../middlewares/checkToken.middleware');

const router = Router();

router.use(checkToken);

router.get('/me', getUserDetail);

module.exports = router;
