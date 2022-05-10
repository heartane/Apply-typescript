import { config } from '../config.js';

let users = [
  {
    id: '1652070756919',
    email: 'a@test.com',
    password: config.test.password,
    name: 'Selly',
    createdAt: '2022-05-09T03:07:04.224Z',
  },
];

export const findByEmail = async (email) => {
  return users.find((user) => user.email === email);
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
