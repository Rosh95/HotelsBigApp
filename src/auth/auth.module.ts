import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {LocalStrategy} from "./local-auth.guard";
import {JwtStrategy} from "./Strategies/jwt.strategy";
import {UsersService} from "../users/users.service";
import {PrismaService} from "../../prisma/prisma.service";
import {AuthController} from "./auth.controller";
import {settings} from "../settings";
import {ConfigModule} from "@nestjs/config";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secretOrPrivateKey: settings().SECRET_KEY,
            signOptions: {expiresIn: '20h'},
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        })

    ],
    controllers : [AuthController],
    providers: [ AuthService, LocalStrategy, JwtStrategy, JwtService, UsersService, PrismaService],
    exports: [AuthService],
})
export class AuthModule {}
