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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("@nestjs/typeorm");
const blog_entity_1 = require("./blog.entity");
const typeorm_2 = require("typeorm");
const operators_1 = require("rxjs/operators");
const users_service_1 = require("../users/users.service");
const slugify = require('slugify');
let BlogService = class BlogService {
    constructor(blogRepository, userService) {
        this.blogRepository = blogRepository;
        this.userService = userService;
    }
    async create(user, blog) {
        blog.author = user;
        console.log(blog);
        return await this.generateSlug(blog.title).pipe((0, operators_1.switchMap)(async (slug) => {
            blog.slug = slug;
            return await this.blogRepository.save(blog);
        }));
    }
    findAll() {
        return (0, rxjs_1.from)(this.blogRepository.find({ relations: ['author'] }));
    }
    async findOne(id) {
        const user = await this.blogRepository.findOne({
            where: {
                id: id
            }
        });
        return user;
    }
    async findByUser(userId) {
        const user = await this.blogRepository.findOne({
            where: [{
                    author: userId
                }],
            relations: ['author']
        });
        return user;
    }
    async updateOne(id, blog) {
        console.log("isnide updateoNE SERVICE", id, blog);
        const user = await this.blogRepository.update(id, blog);
        return user;
    }
    async deleteOne(id) {
        return this.blogRepository.delete(id);
    }
    generateSlug(title) {
        return (0, rxjs_1.of)(slugify(title));
    }
};
BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map