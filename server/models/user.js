let users = [
  {
    email: 'test@test.com',
    password: 'asdf1234',
    name: 'gella',
    createdAt: new Date(),
  },
];

export const findByEmail = async (email) => {
  return users.find((user) => user.email === email);
};

export const createUser = async (userInfo) => {
  const user = {
    ...userInfo,
    createdAt: new Date(),
    id: new Date().toString(),
  };
  users = [...users, user];
};
