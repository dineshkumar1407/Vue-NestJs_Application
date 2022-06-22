import { Controller, Post, Body, Get, Put, Delete,Param,Request,UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AuthService } from 'src/auth/auth.service';
import { usersQueueName,sbClientConnection } from '../app.module';

@Controller('users')
export class UsersController {
   private Usersender=sbClientConnection.createSender(usersQueueName)
    constructor(private authService:AuthService,private service: UsersService,) { }
    @Post("/register")
     create(@Body() user: User) {
        return this.service.createUser(user,this.Usersender);
    }

      @UseGuards(LocalAuthGuard)
      @Post('/login')
      async login(@Request() req) {

        return {message:"User loged in",user:req.user}
      }
      @UseGuards(AuthenticatedGuard)
      @Get('/protected')
      getHello(@Request() req): string {
        return req.user;
      }
      @Get('/logout')
      logout(@Request() req): any {
        req.session.destroy();
        return {msg: 'The user session has ended' }
      }
      @Get("/all")
      getAllUsers(){
        return this.service.getUsers()
      }
     
      @Get(':email')
      getUserByName(@Param() params) {
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