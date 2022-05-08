import dotenv from 'dotenv';

dotenv.config();

const required = (key, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;

  if (value == null) {
    throw new Error(`Env key ${key} is required`);
  }
  return value;
};

export const config = {
  server: {
    port: required('PORT', 8080),
    env: required('NODE_ENV'),
  },
};

/* 
환경변수의 경우 서버 실행 시에 반영되기 때문에, 자동완성이 안된다.
.env 파일에서 키값을 잘 복사에서 붙이지 않으면, 오타가 나기 쉽상이다.
따라서 자동완성 기능을 이용하기 위해서 한 파일에 환경 변수 몰아넣기.

또 OAuth2.0이나 아임포트처럼 외부 서비스를 사용하게되면
.env 정보들이 많아지는데 간혹 정보를 넣어두지 않고 먼저 불러 온 후 까먹는 사태가 일어난다.
따라서 그런 개발 환경에서의 실수를 줄이도록, 런타임 오류 방지 및 편리함을 위해 환경변수 관리 파일을 만들어 봤다.
*/
