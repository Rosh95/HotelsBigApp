import {Body, Controller, HttpCode, HttpStatus, Injectable, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from "./dto/CreateUserDto";
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
@Injectable()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: CreateUserDto })
    @Post('login')
    async login(@Body() userDto : CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'User registration' })
    @ApiBody({ type: CreateUserDto })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('registration')
    async register(@Body() userDto : CreateUserDto) {
        return this.authService.register(userDto);
    }
}
