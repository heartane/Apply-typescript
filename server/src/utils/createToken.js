import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const createJwtToken = (userInfo) => {
  return jwt.sign(userInfo, config.jwt.secretKey, {
    expiresIn: config.jwt.expireTime,
  });
};
