import { config } from '../config.js';

let users = [
  {
    username: 'relly',
    password: config.test.password,
    email: 'b@test.com',
    name: 'Relly',
    url: undefined,
    createdAt: '2022-05-10T03:59:01.845Z',
    id: '1652155141845',
  },
  {
    username: 'selly',
    password: config.test.password,
    email: 'c@test.com',
    name: 'Selly',
    url: undefined,
    createdAt: '2022-05-10T05:27:18.856Z',
    id: '1652160438856',
  },
];

export const findByUsername = async (username) => {
  return users.find((user) => user.username === username);
};

export const createUser = async (userInfo) => {
  const user = {
    ...userInfo,
    createdAt: new Date(),
    id: Date.now().toString(),
  };
  console.log(user);
  users = [...users, user];
};

export const findById = async (id) => {
  return users.find((user) => user.id === id);
};
