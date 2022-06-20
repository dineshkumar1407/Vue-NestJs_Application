import { Injectable } from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { FindOptionsWhere, ObjectID, Repository } from 'typeorm';


import { switchMap, map, tap } from 'rxjs/operators';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
const slugify = require('slugify');

@Injectable()
export class BlogService {
   

    constructor(
        @InjectRepository(Blog) private  blogRepository: Repository<Blog>,
        private userService: UsersService 
    ) {}


     async create(user: User, blog: Blog): Promise<any> {
        blog.author = user;
        console.log(blog);
        return await this.generateSlug(blog.title).pipe(
            switchMap(async(slug: string) => {
                blog.slug = slug;
                return await this.blogRepository.save(blog);
            })
        )
    }

    findAll(): Observable<Blog[]> {
        return from(this.blogRepository.find({relations: ['author']}));
    }

     async findOne(id): Promise<Blog> {
        const user=await this.blogRepository.findOne({
            where:{
                id:id
            }
        })
        return user
    }

    async findByUser(userId):  Promise<any> {
        const user =await this.blogRepository.findOne({
            where: [{
                author: userId
            }],
            relations: ['author']
        })
        return user
    }

    async updateOne(id,blog): Promise<any> {
        const user=await this.blogRepository.update(id, blog)
        return user
    }
    async deleteOne(id) {
       return this.blogRepository.delete(id)
    }

    generateSlug(title: string): Observable<string> {
        return of(slugify(title));
    }
}