import express from 'express';

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
