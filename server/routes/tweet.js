import express from 'express';
import {
  createTweet,
  deleteTweet,
  getTweet,
  getTweets,
  updateTweet,
} from '../controllers/tweets.js';

const router = express.Router();

// endpoint => /tweets
router
  .route('/') //
  .get(getTweets)
  .post(createTweet);

router
  .route('/:id') //
  .get(getTweet)
  .put(updateTweet)
  .delete(deleteTweet);

export default router;
