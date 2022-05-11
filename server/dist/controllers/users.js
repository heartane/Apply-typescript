var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'express-async-errors';
import bcrypt from 'bcrypt';
import { config } from '../config.js';
import { createUser, findByUsername, findById } from '../models/user.js';
import { createJwtToken } from '../utils/createToken.js';
export const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, name, url } = req.body;
    // 이메일 확인
    const userExists = yield findByUsername(username);
    if (userExists) {
        res.status(409).json({ message: `username(${username}) already exists` });
        return;
    }
    // 비밀번호 암호화
    const salt = yield bcrypt.genSalt(config.bcrypt.saltRounds);
    const hashed = yield bcrypt.hash(password, salt);
    // 유저 정보 저장
    yield createUser({
        username,
        email,
        password: hashed,
        name,
        url,
    });
    res.status(201).send('created');
});
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // 유저 확인
    const user = yield findByUsername(username);
    if (!user) {
        res.status(401).json({ message: `${email} not found` });
    }
    // 비밀번호 확인
    const isValidPassword = yield bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        res.status(401).json({ message: `Invalid email or password` });
    }
    // 토큰 생성
    const accessToken = createJwtToken({ id: user.id });
    res.status(200).json({ token: accessToken, username });
});
export const checkMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield findById(req.user.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.status(200).json({ message: 'checked' });
});
//# sourceMappingURL=users.js.map