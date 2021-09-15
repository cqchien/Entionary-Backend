const { Router } = require('express');
const passport = require('passport');
const { login } = require('../controllers/auth.controller');
const { register } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { registerValidationSchema, loginValidationSchema } = require('../validations/auth.validation');

const router = Router();

router.post('/register', validate(registerValidationSchema), register);
router.post('/login', validate(loginValidationSchema), login);

router.post('/login-gg', passport.authenticate('google'));
router.get('/login-gg/callback', passport.authenticate('google'), (req, res) => {
  console.log(req);
});
module.exports = router;
