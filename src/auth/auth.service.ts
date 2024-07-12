import { Injectable , HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import {CreateUserDto} from "./dto/CreateUserDto";
import {User} from "@prisma/client";
import {settings} from "../settings";


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(userDto: CreateUserDto): Promise<any> {
        const user = await this.usersService.findUserByEmail(userDto.email);
        const isPasswordEqual = await  bcrypt.compare(userDto.password, user.password)
        if (user && isPasswordEqual) {
            return user
        }
        throw new HttpException('Wrong email or password, please try again', HttpStatus.BAD_REQUEST);

    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async register(userDto: CreateUserDto) {
        const isExistUser = await  this.usersService.findUserByEmail(userDto.email)
        if (isExistUser){
            throw new HttpException('User with this email already exist', HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await this._generatedHash(userDto.password)
        const user = await  this.usersService.createUser({
            ...userDto,
            password: hashedPassword,
        });
        return this.generateToken(user)
    }

    async _generatedHash(password : string) {
        const passwordSalt = await bcrypt.genSalt( 10);
        return  await bcrypt.hash(password, passwordSalt);
    }

    async  generateToken (user: User){
        const payload = {
            email: user.email,
            id: user.id
        }

        return {
            token: this.jwtService.sign(payload, {
                secret: settings().SECRET_KEY,
                expiresIn: settings().TOKEN_EXPIRED_TIME
            })
        }
    }
}
