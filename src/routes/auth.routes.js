const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { register } = require('../controllers/auth.controller');

const router = Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
