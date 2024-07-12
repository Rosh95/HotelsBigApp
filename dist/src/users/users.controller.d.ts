import { UsersService } from "./users.service";
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    userInfo(): Promise<{
        id: number;
        email: string;
        password: string;
    }[]>;
}
