import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleErrors } from 'src/common/handlers/error-handler';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(
       @InjectModel( User.name )
       private readonly userModel: Model<User>,
       private readonly jwtService: JwtService
     ) {}

   async register(createUserDto: CreateUserDto){
      try {
         const { password, ...userData } = createUserDto;
         createUserDto.username = createUserDto.username.toLocaleLowerCase();
         createUserDto.email = createUserDto.email.toLocaleLowerCase();
         const user = await this.userModel.create({
               ...userData,
               password: bcrypt.hashSync(password, 10)
          });
           const { password: encryptedPass, ...userWithoutPassword } = user.toObject();
           
           return {token: this.getJwtToken({username: user.username})};
       } catch (error) {
         handleErrors(error);
       }
   }

   async login(loginUserDto: LoginUserDto){  
      try {
         const { username, password } = loginUserDto;
         const user = await this.userModel
            .findOne({ username: username })
            .select('+password');
         if(!user){
            throw new UnauthorizedException('Invalid credentials');
         }
         if( !bcrypt.compareSync(password, user.password) ){
            throw new UnauthorizedException('Invalid credentials');
         }
         return {token: this.getJwtToken({username})};
      } catch (error) {
         handleErrors(error);
      }
   }

   private getJwtToken(payload: JwtPayload){
      const token = this.jwtService.sign(payload);
      return token;
   }
}
