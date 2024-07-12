import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "../auth/dto/CreateUserDto";
export declare class UsersService {
    protected prismaService: PrismaService;
    constructor(prismaService: PrismaService);
    findUserByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    getAllUser(): Promise<{
        id: number;
        email: string;
        password: string;
    }[]>;
    createUser(user: CreateUserDto): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
}
