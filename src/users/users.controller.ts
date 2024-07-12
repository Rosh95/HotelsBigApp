import {Controller, Get, Injectable, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {JwtStrategy} from "../auth/Strategies/jwt.strategy";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
@Injectable()
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @ApiOperation({ summary: 'Get users' })
    @UseGuards(JwtAuthGuard)
    @Get()
    async userInfo() {
        return this.userService.getAllUser()
    }
}
