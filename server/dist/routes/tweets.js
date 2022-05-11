import express from 'express';
import { body } from 'express-validator';
import { createTweet, deleteTweet, getTweet, getTweets, updateTweet, } from '../controllers/tweets.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
const router = express.Router();
const validateTweet = [
    body('text') //
        .trim()
        .notEmpty()
        .withMessage('트윗을 입력해주세요')
        .bail()
        .isLength({ max: 400 })
        .withMessage('400자 미만으로 입력해주세요'),
    validate,
];
// endpoint => /tweets
router
    .route('/') //
    .post(protect, validateTweet, createTweet)
    .get(protect, getTweets);
router
    .route('/:id') //
    .get(protect, getTweet)
    .put(protect, validateTweet, updateTweet)
    .delete(protect, deleteTweet);
export default router;
//# sourceMappingURL=tweets.js.map