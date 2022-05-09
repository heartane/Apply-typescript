import 'express-async-errors';

export const createTweet = async (req, res, next) => {};

export const getTweets = async (req, res, next) => {
  const tweets = getAll();
  return tweets;
};

export const getTweet = async (req, res, next) => {};

export const updateTweet = async (req, res, next) => {};

export const deleteTweet = async (req, res, next) => {};
