import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as brcypt from "bcrypt"
import { ServiceBusMessage } from '@azure/service-bus';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }
    async createUser(user: User,userSender):Promise<any> {

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
        
       const addUser= await this.usersRepository.save(newUser)
       if(addUser){

        const {password, ...user} = addUser;
        const message:ServiceBusMessage={
            body:{user},
            subject:"user_created"
        }
        await userSender.sendMessages(message)
        userSender.close()
       }
        return{
            msg:"User registeration sucesss",
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
       await this.usersRepository.save(user)
    }

    async deleteUser(id): Promise<void> {
        await this.usersRepository.delete(id);
    }
}