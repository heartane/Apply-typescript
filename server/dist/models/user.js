var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export const findByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return users.find((user) => user.username === username);
});
export const createUser = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = Object.assign(Object.assign({}, userInfo), { createdAt: new Date(), id: Date.now().toString() });
    console.log(user);
    users = [...users, user];
});
export const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return users.find((user) => user.id === id);
});
//# sourceMappingURL=user.js.map