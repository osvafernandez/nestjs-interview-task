import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategies';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    MongooseModule.forFeature([{
          name: User.name,
          schema: UserSchema
        }]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' } };
      }
    }),
    MessagesModule
  ],
  exports: [JwtStrategy, PassportModule, JwtModule, AuthService]
})
export class AuthModule {}
