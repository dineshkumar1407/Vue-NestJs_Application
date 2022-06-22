import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createUser(user: User, userSender: any): Promise<any>;
    getUsers(): Promise<User[]>;
    getUser(_id: number): Promise<any>;
    getUserByUserName(username: string): Promise<any>;
    updateUser(user: User): Promise<void>;
    deleteUser(id: any): Promise<void>;
}
