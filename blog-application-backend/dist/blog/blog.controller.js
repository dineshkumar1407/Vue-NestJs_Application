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
exports.BlogController = exports.storage = exports.BLOG_ENTRIES_URL = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const rxjs_1 = require("rxjs");
const blog_entity_1 = require("./blog.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const path_1 = require("path");
const local_auth_guard_1 = require("../auth/local.auth.guard");
const authenticated_guard_1 = require("../auth/authenticated.guard");
const app_module_1 = require("../app.module");
exports.BLOG_ENTRIES_URL = 'http://localhost:3000/api/blog-entries';
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/blog-entry-images',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        }
    })
};
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
        this.blogSender = app_module_1.sbClientConnection.createSender(app_module_1.blogQueueName);
    }
    create(blog, req) {
        const user = req.user;
        return this.blogService.create(user, blog, this.blogSender);
    }
    findOne(params) {
        console.log("findone");
        return this.blogService.findOne(params.id);
    }
    updateOne(id, blog) {
        return this.blogService.updateOne(id, blog);
    }
    deleteOne(params) {
        console.log("delete");
        return this.blogService.deleteOne(params.id);
    }
    uploadFile(file, req) {
        return (0, rxjs_1.of)(file);
    }
    findImage(imagename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), 'uploads/blog-entry-images/' + imagename)));
    }
};
__decorate([
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_entity_1.Blog, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, blog_entity_1.Blog]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "updateOne", null);
__decorate([
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    (0, common_1.Delete)('/remove/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('image/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', exports.storage)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('image/:imagename'),
    __param(0, (0, common_1.Param)('imagename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "findImage", null);
BlogController = __decorate([
    (0, common_1.Controller)('/blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map