import express from 'express';
import { checkMe, login, signup } from '../controllers/users.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// endpoint => /users
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/me').get(protect, checkMe);

export default router;
