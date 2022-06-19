import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createUser(user: User): Promise<{
        msg: string;
        id: number;
        email: string;
    }>;
    getUsers(): Promise<User[]>;
    getUser(_id: number): Promise<any>;
    getUserByUserName(username: string): Promise<any>;
    updateUser(user: User): Promise<void>;
    deleteUser(id: any): Promise<void>;
}
