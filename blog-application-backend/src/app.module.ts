import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { ServiceBusClient} from "@azure/service-bus";
import { NotificationModule } from './notification/notification.module';
export const connectionString = "Endpoint=sb://basicjsapp-1.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=foNWmEpKFvBCL6fPKZ/ky+s39MI6s9NgGzKHtIf4oIQ=";
export const usersQueueName = "userQueue-nestjs"
export const blogQueueName="blogQueue-nestjs"
export const sbClientConnection = new ServiceBusClient(connectionString);
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    BlogModule,
    NotificationModule
  ],
  controllers:[AppController],
  providers: [AppService],
})
export class AppModule {}

