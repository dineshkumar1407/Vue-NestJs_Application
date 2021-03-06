import { Controller, Post, Body, Get, Put, Delete,Param,Request,UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AuthService } from 'src/auth/auth.service';
@Controller('users')
export class UsersController {

    constructor(private authService:AuthService,private service: UsersService,) { }
    @Post("/register")
     create(@Body() user: User) {
        return this.service.createUser(user);
    }

      @UseGuards(LocalAuthGuard)
      @Post('/login')
      async login(@Request() req) {

        return {messge:"User loged in",user:req.user}
      }
      @UseGuards(AuthenticatedGuard)
      @Get('/protected')
      getHello(@Request() req): string {
        return req.user;
      }

      @Get("/all")
      getAllUsers(){
        return this.service.getUsers()
      }
     
      @Get(':email')
      getUserByName(@Param() params) {
        console.log(params)
          return this.service.getUserByUserName(params.email);
      }
      @Put(":id")
      update(@Body() user: User) {
        return this.service.updateUser(user);
      }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}