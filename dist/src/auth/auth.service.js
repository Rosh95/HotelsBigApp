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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const settings_1 = require("../settings");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    validateUser(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findUserByEmail(userDto.email);
            const isPasswordEqual = yield bcrypt.compare(userDto.password, user.password);
            if (user && isPasswordEqual) {
                return user;
            }
            throw new common_1.HttpException('Wrong email or password, please try again', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    login(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.validateUser(userDto);
            return this.generateToken(user);
        });
    }
    register(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExistUser = yield this.usersService.findUserByEmail(userDto.email);
            if (isExistUser) {
                throw new common_1.HttpException('User with this email already exist', common_1.HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = yield this._generatedHash(userDto.password);
            const user = yield this.usersService.createUser(Object.assign(Object.assign({}, userDto), { password: hashedPassword }));
            return this.generateToken(user);
        });
    }
    _generatedHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcrypt.genSalt(10);
            return yield bcrypt.hash(password, passwordSalt);
        });
    }
    generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                email: user.email,
                id: user.id
            };
            return {
                token: this.jwtService.sign(payload, {
                    secret: (0, settings_1.settings)().SECRET_KEY,
                    expiresIn: (0, settings_1.settings)().TOKEN_EXPIRED_TIME
                })
            };
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map