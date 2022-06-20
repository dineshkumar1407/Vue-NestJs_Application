import { BlogService } from './blog.service';
import { Observable } from 'rxjs';
import { Blog } from './blog.entity';
export declare const BLOG_ENTRIES_URL = "http://localhost:3000/api/blog-entries";
export declare const storage: {
    storage: any;
};
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    create(blog: Blog, req: any): Promise<any>;
    findOne(params: any): Promise<Blog>;
    updateOne(id: number, blog: Blog): Promise<any>;
    deleteOne(params: any): Promise<import("typeorm").DeleteResult>;
    uploadFile(file: any, req: any): Observable<any>;
    findImage(imagename: any, res: any): Observable<any>;
}
