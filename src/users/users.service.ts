import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {CreateUserDto} from "../auth/dto/CreateUserDto";

@Injectable()
export class UsersService {
    constructor(
        protected prismaService: PrismaService
    ) {
    }

    async findUserByEmail(email: string) {
        return this.prismaService.user.findFirst({
            where: {
                email: email
            }
        });
    }
    async getAllUser() {
        return this.prismaService.user.findMany()
    }

    async createUser(user: CreateUserDto) {
        return this.prismaService.user.create({
            data: {
                email: user.email,
                password: user.password,
            }
        });

    }


}
