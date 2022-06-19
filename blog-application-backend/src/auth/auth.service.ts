import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private  usersService: UsersService) {}
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByUserName(username);
        const passwordValid = await bcrypt.compare(password, user.password)
        if(user && passwordValid){
            const {password, ...result} = user;
            return result;
            }
            return null
        }
        
}
