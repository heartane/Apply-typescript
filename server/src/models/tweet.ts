import * as userRepo from './user.js';

type TweetData = {
  id: string,
  text: string,
  userId: string,
  createdAt: Date,
}

type Tweet = TweetData & {
  username?: string,
  name?: string,
  url?: string,
}

let tweets: TweetData[] = [
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

export const createContent = async (text: string, userId:string): Promise<Tweet>=> {
  const tweet = {
    id: Date.now().toString(),
    text,
    userId,
    createdAt: new Date(),
  };
  tweets = [tweet, ...tweets];
  console.log(tweets);
  return (await getById(tweet.id))!;
};

export const getAll = async (): Promise<Tweet[]> => {
  /* 
  각 트윗 데이터에 아이디, 이름, 사진url을 포함해 맵핑하기
  해당 user가 존재하지 않을 경우 null, undefined로 type에러까지 고려한다!
  */

  return Promise.all(
    tweets.map(async (tweet) => {
      const user = await userRepo.findById(tweet.userId);
      return { ...tweet, username: user?.username, name: user?.name, url: user?.url };
    })
  );

  /* 
  promise.all 과 async/await의 차이점?
  비동기 처리를 병렬적으로 해서 더 빠르게 처리할 수 있다!
  비동기 처리 실패 시에 그 즉시 반환한다.
  */
};

export const getAllByUsername = async (username: string): Promise<Tweet[]>=> {
  // 맵핑되어있는 getAll() 데이터에서 필터하기
  return getAll() //
    .then((tweets) => tweets.filter((tweet) => tweet.username === username));
};

export const getById = async (id: string): Promise<Tweet|null> => {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (!tweet) return null;
  const user = await userRepo.findById(tweet.userId);
  return { ...tweet, username: user?.username, name: user?.name, url: user?.url };
};

export const updateOne = async (tweet:object, text:string)=> {
  return { ...tweet, text };
};

export const deleteOne = async (id: string): Promise<void> => {
  tweets = tweets.filter((tweet) => tweet.id !== id);
};

/* 
일단 데이터베이스 구축 전 더미데이터로 데이터를 처리해보았다.
DB 통신처럼 비동기 환경을 위해 async/await과 promise를 사용했다.
*/
