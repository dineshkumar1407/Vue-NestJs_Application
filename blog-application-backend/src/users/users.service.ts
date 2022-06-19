import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as brcypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }
    async createUser(user: User) {
        const saltOrRounds = 10;
        const hashedPassword = await brcypt.hash(user.password, saltOrRounds);
        const newUser={
            id:user.id,
            username:user.username,
            email:user.email,
            password:hashedPassword,
            createdAt:user.createdAt,
            isActive:user.isActive
        }
        this.usersRepository.save(newUser)
        return{
            msg:"User registartion sucesss",
            id:newUser.id,
            email:newUser.email
        
        }
    }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<any> {
        return await this.usersRepository.findOne({
            where: [{ "id": _id }]
        });
    }

    async getUserByUserName(username:string):Promise<any>{
        return await this.usersRepository.findOne({
            where: [{ "username": username }]
        });
    }

    async updateUser(user: User) {
        this.usersRepository.save(user)
    }

    async deleteUser(id): Promise<void> {
        this.usersRepository.delete(id);
    }
}