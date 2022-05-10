import * as userRepo from './user.js';

let tweets = [
  {
    id: '1652154713351',
    text: "Let's start!",
    userId: '1652155141845',
    createdAt: '2022-05-10T03:51:53.351Z',
  },
  {
    id: '1652161203772',
    text: "Let's hoooo",
    userId: '1652155141845',
    createdAt: '2022-05-10T05:40:03.772Z',
  },
];

export const createContent = async (text, userId) => {
  const tweet = {
    id: Date.now().toString(),
    text,
    userId,
    createdAt: new Date(),
  };
  tweets = [tweet, ...tweets];
  console.log(tweets);
  return tweet;
};

export const getAll = async () => {
  // 각 트윗 데이터에 아이디, 이름, 사진url을 포함해 맵핑하기
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepo.findById(tweet.userId);
      return { ...tweet, username, name, url };
    })
  );

  /* 
  promise.all 과 async/await의 차이점?
  비동기 처리를 병렬적으로 해서 더 빠르게 처리할 수 있다!
  비동기 처리 실패 시에 그 즉시 반환한다.
  */
};

export const getAllByUsername = async (username) => {
  // 맵핑되어있는 getAll() 데이터에서 필터하기
  return getAll() //
    .then((tweets) => tweets.filter((tweet) => tweet.username === username));
};

export const getById = async (id) => {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (!tweet) return null;
  const { username, name, url } = await userRepo.findById(tweet.userId);
  return { ...tweet, username, name, url };
};

export const updateOne = async (tweet, text) => {
  return { ...tweet, text };
};

export const deleteOne = async (id) => {
  return tweets.filter((tweet) => tweet.id !== id);
};

/* 
일단 데이터베이스 구축 전 더미데이터로 데이터를 처리해보았다.
DB 통신처럼 비동기 환경을 위해 async/await과 promise를 사용했다.
*/
