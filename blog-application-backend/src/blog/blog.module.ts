import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { BlogController } from './blog.controller';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Blog]),
        AuthModule,
        UsersModule
    ],
    controllers: [BlogController],
    providers: [BlogService]
})
export class BlogModule {}