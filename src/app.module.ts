import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true  }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    CommonModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
