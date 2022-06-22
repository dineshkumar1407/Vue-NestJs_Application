import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersController {
    private authService;
    private service;
    private Usersender;
    constructor(authService: AuthService, service: UsersService);
    create(user: User): Promise<any>;
    login(req: any): Promise<{
        message: string;
        user: any;
    }>;
    getHello(req: any): string;
    logout(req: any): any;
    getAllUsers(): Promise<User[]>;
    getUserByName(params: any): Promise<any>;
    update(user: User): Promise<void>;
    deleteUser(params: any): Promise<void>;
}
