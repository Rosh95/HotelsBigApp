"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
const process = require("process");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const settings = () => ({
    SECRET_KEY: process.env.SECRET_KEY || 'secret_key',
    DATABASE_URL: process.env.DATABASE_URL || 'no connection',
    TOKEN_EXPIRED_TIME: process.env.TOKEN_EXPIRED_TIME || '10h'
});
exports.settings = settings;
//# sourceMappingURL=settings.js.map