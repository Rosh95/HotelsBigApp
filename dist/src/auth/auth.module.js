"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const users_module_1 = require("../users/users.module");
const local_auth_guard_1 = require("./local-auth.guard");
const jwt_strategy_1 = require("./Strategies/jwt.strategy");
const users_service_1 = require("../users/users.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const auth_controller_1 = require("./auth.controller");
const settings_1 = require("../settings");
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
dotenv.config();
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secretOrPrivateKey: (0, settings_1.settings)().SECRET_KEY,
                signOptions: { expiresIn: '20h' },
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            })
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, local_auth_guard_1.LocalStrategy, jwt_strategy_1.JwtStrategy, jwt_1.JwtService, users_service_1.UsersService, prisma_service_1.PrismaService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map