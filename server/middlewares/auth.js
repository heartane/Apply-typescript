import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const protect = (req, res, next) => {
  const { authorization } = req.headers;

  if (!(authorization && authorization.startsWith('Bearer'))) {
    res.status(401);
    throw new Error('not authorized, token is required');
  }

  try {
    const token = authorization.split(' ')[1];
    req.user = jwt.verify(token, config.jwt.secretKey);
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error('not authorized, token is invalid');
  }
};
