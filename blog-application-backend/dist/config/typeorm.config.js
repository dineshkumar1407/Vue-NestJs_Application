"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const path_1 = require("path");
exports.typeOrmConfig = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "toor@123",
    "database": "blog_app",
    "entities": [(0, path_1.join)(__dirname, "/../**/*.entity{.ts,.js}")],
    "synchronize": true
};
//# sourceMappingURL=typeorm.config.js.map