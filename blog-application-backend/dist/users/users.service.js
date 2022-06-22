"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const brcypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async createUser(user, userSender) {
        const saltOrRounds = 10;
        const hashedPassword = await brcypt.hash(user.password, saltOrRounds);
        const newUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            password: hashedPassword,
            createdAt: user.createdAt,
            isActive: user.isActive
        };
        const addUser = await this.usersRepository.save(newUser);
        if (addUser) {
            const { password } = addUser, user = __rest(addUser, ["password"]);
            const message = {
                body: { user },
                subject: "user_created"
            };
            await userSender.sendMessages(message);
            userSender.close();
        }
        return {
            msg: "User registeration sucesss",
            id: newUser.id,
            email: newUser.email
        };
    }
    async getUsers() {
        return await this.usersRepository.find();
    }
    async getUser(_id) {
        return await this.usersRepository.findOne({
            where: [{ "id": _id }]
        });
    }
    async getUserByUserName(username) {
        return await this.usersRepository.findOne({
            where: [{ "username": username }]
        });
    }
    async updateUser(user) {
        await this.usersRepository.save(user);
    }
    async deleteUser(id) {
        await this.usersRepository.delete(id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map