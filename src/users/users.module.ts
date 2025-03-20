import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesModule } from 'src/messages/messages.module';
import { LoggerService } from 'src/loger.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, LoggerService],
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
    AuthModule,
    MessagesModule,
  ]
})
export class UsersModule {}
