import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { User } from "src/users/entities/user.entity";
import { Model } from "mongoose";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

   constructor(
      @InjectModel( User.name ) private readonly userRepository: Model<User>
   ){
      super({
         secretOrKey: process.env.JWT_SECRET,
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      });
   }

   async validate(payload: JwtPayload): Promise<User>{
      const { username } = payload;
      const user = await this.userRepository.findOne({ username })

      if(!user){
         throw new UnauthorizedException('Token not valid');
      }

      return user;
   }
}
