import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from "./dto/CreateUserDto";
import { User } from "@prisma/client";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(userDto: CreateUserDto): Promise<any>;
    login(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    register(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    _generatedHash(password: string): Promise<string>;
    generateToken(user: User): Promise<{
        token: string;
    }>;
}
