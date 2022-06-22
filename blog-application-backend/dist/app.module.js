"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.sbClientConnection = exports.blogQueueName = exports.usersQueueName = exports.connectionString = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_config_1 = require("./config/typeorm.config");
const auth_module_1 = require("./auth/auth.module");
const blog_module_1 = require("./blog/blog.module");
const service_bus_1 = require("@azure/service-bus");
const notification_module_1 = require("./notification/notification.module");
exports.connectionString = "Endpoint=sb://basicjsapp-1.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=foNWmEpKFvBCL6fPKZ/ky+s39MI6s9NgGzKHtIf4oIQ=";
exports.usersQueueName = "userQueue-nestjs";
exports.blogQueueName = "blogQueue-nestjs";
exports.sbClientConnection = new service_bus_1.ServiceBusClient(exports.connectionString);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeOrmConfig),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            blog_module_1.BlogModule,
            notification_module_1.NotificationModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map