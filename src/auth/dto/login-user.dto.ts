import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginUserDto {
   @ApiProperty({ description: 'Username' })
   @IsString()
   username: string;

   @ApiProperty({ description: 'Password' })
   @IsString()
   password: string;
}