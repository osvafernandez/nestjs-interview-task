import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
   @IsString()
   @MinLength(3)
   name: string;

   @IsString()
   @IsEmail()
   email: string;

   @IsString()
   @MinLength(6)
   password: string;
}


enum UserRole {
   ADMIN = 'admin',
   USER = 'user',
   GUEST = 'guest',
}
