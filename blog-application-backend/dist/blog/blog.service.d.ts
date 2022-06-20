import { Observable } from 'rxjs';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
export declare class BlogService {
    private blogRepository;
    private userService;
    constructor(blogRepository: Repository<Blog>, userService: UsersService);
    create(user: User, blog: Blog): Promise<any>;
    findAll(): Observable<Blog[]>;
    findOne(id: any): Promise<Blog>;
    findByUser(userId: any): Promise<any>;
    updateOne(id: any, blog: any): Promise<any>;
    deleteOne(id: any): Promise<import("typeorm").DeleteResult>;
    generateSlug(title: string): Observable<string>;
}
