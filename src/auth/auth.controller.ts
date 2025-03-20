import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  async register(@Body () createUserDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const { token } = await this.authService.register(createUserDto);
    response.cookie('jwt_token', `${token}`, {
      httpOnly: true,
      secure: false, // hacer true para https
      sameSite: 'strict',
    });
    return {jwt_token: token};
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const { token } = await this.authService.login(loginUserDto);
    response.cookie('jwt_token', `${token}`, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });
    return {jwt_token: token};
  }
}
