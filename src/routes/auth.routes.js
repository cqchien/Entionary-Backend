const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { register } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { registerValidationSchema, loginValidationSchema } = require('../validations/auth.validation');

const router = Router();

router.post('/register', validate(registerValidationSchema), register);
router.post('/login', validate(loginValidationSchema), login);

module.exports = router;
