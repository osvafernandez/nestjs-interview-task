import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { MessagesGateway } from 'src/messages/messages.gateway';
import { CustomRequest } from 'src/common/interfaces/cusotm-request.interface';


@ApiTags("Users")
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly messagesGateway: MessagesGateway
  ) {}
    
  @Post()
  @ApiBearerAuth()
  async create(@Body() createUserDto: CreateUserDto, @Req() req: CustomRequest) {
    const user = await this.usersService.create(createUserDto);
    this.messagesGateway.emitUserEvent('User Created', req.user.username);
    return user;
  }

  @Get()
  @ApiBearerAuth()
  async findAll(@Query() query: PaginationDto) {
    return await this.usersService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: CustomRequest) {
    const user = await this.usersService.update(id, updateUserDto);
    this.messagesGateway.emitUserEvent('User Updated', req.user.username);
    return user;
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id', ParseMongoIdPipe) id: string, @Req() req: CustomRequest) {
    await this.usersService.remove(id);
    this.messagesGateway.emitUserEvent('User Deleted', req.user.username);
    return;
  }
}
