import 'express-async-errors';
import bcrypt from 'bcrypt';
import { config } from '../config.js';
import { createUser, findByEmail, findById } from '../models/user.js';
import { createJwtToken } from '../utils/createToken.js';

export const signup = async (req, res, next) => {
  const { email, password, name, url } = req.body;

  // 이메일 확인
  const userExists = await findByEmail(email);

  if (userExists) {
    res.status(409).json({ message: `${email} / already exists` });
    return;
  }
  // 비밀번호 암호화
  const salt = await bcrypt.genSalt(config.bcrypt.saltRounds);
  const hashed = await bcrypt.hash(password, salt);

  // 유저 정보 저장
  await createUser({
    email,
    password: hashed,
    name,
    url,
  });

  res.status(201).send('created');
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // 유저 확인
  const user = await findByEmail(email);
  if (!user) {
    res.status(401).json({ message: `${email} not found` });
  }

  // 비밀번호 확인
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ message: `Invalid email or password` });
  }

  // 토큰 생성
  const accessToken = createJwtToken({ id: user.id });

  res.status(200).json({ token: accessToken, email });
};

export const checkMe = async (req, res, next) => {
  const user = await findById(req.user.id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(200).json({ message: 'checked' });
};
