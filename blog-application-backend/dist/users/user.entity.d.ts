import { Blog } from 'src/blog/blog.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    isActive: boolean;
    blogs: Blog[];
}
