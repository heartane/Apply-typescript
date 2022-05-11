import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middlewares/auth.js';
import { checkMe, login, signup } from '../controllers/users.js';
import { validate } from '../middlewares/validate.js';
const router = express.Router();
const validateCredentials = [
    body('username')
        .trim()
        .toLowerCase()
        .isLength({ min: 3 })
        .withMessage('아이디를 3글자 이상 입력해주세요'),
    body('password') //
        .trim()
        .isLength({ min: 6 })
        .withMessage('6자리 이상 입력해주세요')
        .bail()
        .matches(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,20}$/)
        .withMessage('비밀번호 형식이 유효하지 않습니다'),
    validate,
]; // for login
const validateSignup = [
    ...validateCredentials,
    body('email') //
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('이메일 형식이 유효하지 않습니다'),
    body('name') //
        .trim()
        .isLength({ min: 2 })
        .withMessage('두 글자 이상 입력해주세요'),
    body('url') //
        .isURL()
        .withMessage('url 형식이 유효하지 않습니다')
        .optional({
        nullable: true,
        checkFalsy: true,
    }),
    validate,
];
// endpoint => /users
router.route('/signup').post(validateSignup, signup);
router.route('/login').post(validateCredentials, login);
router.route('/me').get(protect, checkMe);
export default router;
//# sourceMappingURL=users.js.map