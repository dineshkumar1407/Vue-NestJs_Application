import { Injectable } from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { FindOptionsWhere, ObjectID, Repository } from 'typeorm';
import { ServiceBusMessage } from '@azure/service-bus';

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


     async create(user: User, blog: Blog,blogSender): Promise<any> {
        blog.author = user;
        blog.slug= await this.generateSlug(blog.title)
        const newBlog= await this.blogRepository.save(blog)
        if(newBlog){
            const message:ServiceBusMessage={
                body:{newBlog},
                subject:"blog_created"
            }
            await blogSender.sendMessages(message)
            blogSender.close()
           }
          
           return {
            message:"Blog created successfully",
            id:newBlog.id,

           }
    }

    async findAll(): Promise<Blog[]> {
        const myblogs= await this.blogRepository.find({relations: ['author']});
        return myblogs
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

    generateSlug(title: string): Promise<string> {
        return slugify(title);
    }
}