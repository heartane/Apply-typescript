var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as userRepo from './user.js';
let tweets = [
    {
        id: '1652154713351',
        text: "Let's start!",
        userId: '1652155141845',
        createdAt: new Date(),
    },
    {
        id: '1652161203772',
        text: "Let's hoooo",
        userId: '1652155141845',
        createdAt: new Date(),
    },
];
export const createContent = (text, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = {
        id: Date.now().toString(),
        text,
        userId,
        createdAt: new Date(),
    };
    tweets = [tweet, ...tweets];
    console.log(tweets);
    return (yield getById(tweet.id));
});
export const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    /*
    각 트윗 데이터에 아이디, 이름, 사진url을 포함해 맵핑하기
    해당 user가 존재하지 않을 경우 null, undefined로 type에러까지 고려한다!
    */
    return Promise.all(tweets.map((tweet) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepo.findById(tweet.userId);
        return Object.assign(Object.assign({}, tweet), { username: user === null || user === void 0 ? void 0 : user.username, name: user === null || user === void 0 ? void 0 : user.name, url: user === null || user === void 0 ? void 0 : user.url });
    })));
    /*
    promise.all 과 async/await의 차이점?
    비동기 처리를 병렬적으로 해서 더 빠르게 처리할 수 있다!
    비동기 처리 실패 시에 그 즉시 반환한다.
    */
});
export const getAllByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    // 맵핑되어있는 getAll() 데이터에서 필터하기
    return getAll() //
        .then((tweets) => tweets.filter((tweet) => tweet.username === username));
});
export const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (!tweet)
        return null;
    const user = yield userRepo.findById(tweet.userId);
    return Object.assign(Object.assign({}, tweet), { username: user === null || user === void 0 ? void 0 : user.username, name: user === null || user === void 0 ? void 0 : user.name, url: user === null || user === void 0 ? void 0 : user.url });
});
export const updateOne = (tweet, text) => __awaiter(void 0, void 0, void 0, function* () {
    return Object.assign(Object.assign({}, tweet), { text });
});
export const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    tweets = tweets.filter((tweet) => tweet.id !== id);
});
/*
일단 데이터베이스 구축 전 더미데이터로 데이터를 처리해보았다.
DB 통신처럼 비동기 환경을 위해 async/await과 promise를 사용했다.
*/
//# sourceMappingURL=tweet.js.map