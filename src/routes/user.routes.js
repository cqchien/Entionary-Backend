const { Router } = require('express');
const { getUserDetail, resetPassword, sendVerifyCode } = require('../controllers/user.controller');
const checkToken = require('../middlewares/checkToken.middleware');
const validate = require('../middlewares/validate.middleware');
const { resetPasswordValidationSchema, sendVerifyCodeValidationSchema } = require('../validations/user.validation');

const router = Router();

router.use(checkToken);

router.get('/me', getUserDetail);
router.patch('/reset-password', validate(resetPasswordValidationSchema), resetPassword);
router.patch('/send-code', validate(sendVerifyCodeValidationSchema), sendVerifyCode);
module.exports = router;
