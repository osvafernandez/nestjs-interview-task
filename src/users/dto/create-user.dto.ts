import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
   @ApiProperty({ description: 'User name' })
   @IsString()
   @MinLength(3)
   username: string;

   @ApiProperty({ description: 'User email' })
   @IsString()
   @IsEmail()
   email: string;
   
   @ApiProperty({ description: 'User password'})
   @IsString()
   @MinLength(6)
   @MaxLength(50)
   // @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$/, { message: 'password too weak' }) //por ahora me salto la validaccion
   password: string;
}


// Roles no implementados
// enum UserRole {
//    ADMIN = 'admin',
//    USER = 'user',
//    GUEST = 'guest',
// }
