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
import { createContent, deleteOne, getAll, getAllByUsername, getById, updateOne, } from '../models/tweet.js';
export const createTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    const userId = req.user.id;
    const tweet = yield createContent(text, userId);
    res.status(201).json(tweet);
});
export const getTweets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 전체를 가져오거나 자신의 트윗만 선별해서 가져오거나!
    const { username } = req.query;
    console.log(username);
    const tweets = yield (username ? getAllByUsername(username) : getAll());
    console.log('트윗이야', tweets);
    return res.status(200).json(tweets);
});
export const getTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.id;
    const tweet = yield getById(tweetId);
    if (!tweet) {
        res.status(404).json({ message: `Tweet id(${tweetId}) does not exist` });
        return;
    }
    return res.status(200).json(tweet);
});
export const updateTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.id;
    const { text } = req.body;
    const tweet = yield getById(tweetId);
    if (!tweet) {
        res.status(404).json({ message: `Tweet id(${tweetId}) does not exist` });
        return;
    } // 트윗 유무
    if (tweet.userId !== req.user.id) {
        return res.sendStatus(403);
    } // 권한 확인
    const updated = yield updateOne(tweet, text);
    return res.status(200).json(updated);
});
export const deleteTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.id;
    const tweet = yield getById(tweetId);
    if (!tweet) {
        res.status(404).json({ message: `Tweet id(${tweetId}) does not exist` });
        return;
    }
    if (tweet.userId !== req.user.id) {
        return res.sendStatus(403);
    }
    yield deleteOne(tweetId);
    res.sendStatus(204);
});
/*
이커머스 프로젝트를 하면서,
특히 필드가 많은 주문 부분 기능 구현을 하면서 데이터 수정이 많았고
그러면서 비즈니스 로직을 전체적으로 수정하는 비효율적인 부분이 있었다.
그때까지만 해도 모듈화에 대한 이해가 부족했었다.

하지만 프로젝트를 끝내고 취업을 위해 더 깊이 공부하면서
클래스든 함수든 한 역할에 집중하고 책임을 나누는 것의 중요성을 알게되었고
모듈화를 통해 서로간의 영향을 최소화할 수 있다는 것을 알게되었다.

그래서 이번에는 컨트롤러는 요청을 처리하는 큰 로직만 담고
그에 맞는 데이터 처리 작업은 데이터를 관리하는 모델에서 하도록 정리해서
데이터에 변화가 생겨도 비즈니스 로직은 최대한 영향이 가지 않도록(수정이 필요없도록) 작성하는 연습을 했다.
*/
//# sourceMappingURL=tweets.js.map