import express from 'express';

const router = express.Router();

// endpoint => /users
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/me').get(checkMe);

export default router;
