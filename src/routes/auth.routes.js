const { Router } = require('express');
const passport = require('passport');
const { login, register, loginWithSocialNetwork } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { registerValidationSchema, loginValidationSchema } = require('../validations/auth.validation');

const router = Router();

router.post('/register', validate(registerValidationSchema), register);
router.post('/login', validate(loginValidationSchema), login);

router.post('/login-gg', passport.authenticate('google-token', { session: false }), loginWithSocialNetwork);

module.exports = router;
