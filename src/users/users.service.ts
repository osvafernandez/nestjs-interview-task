import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { handleErrors } from 'src/common/handlers/error-handler';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel( User.name )
    private readonly userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.username = createUserDto.username.toLowerCase();
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      handleErrors(error);
    }
  }

  async findAll(query: PaginationDto) {
    try {
      const { limit = 15 } = query;
      const users = await this.userModel.find()
        .limit(limit)
        .sort({ createdAt: -1 })
        .select('-__v -password')
        .lean();
      return users;
    } catch (error) {
      handleErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      if( !isValidObjectId(id) ){
        throw new BadRequestException(`The id: ${id} is not a valid id`);
      }
      let user: User = await this.userModel
        .findById(id)
        .select('-__v -password')
        .lean();
      if( !user ) throw new NotFoundException();
      return user;
    } catch (error) {
      handleErrors(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if( !user ){
        throw new NotFoundException(`User with id ${id} not found`);
      }
      updateUserDto.username = updateUserDto.username.toLocaleLowerCase();
      user.updatedAt = new Date(Date.now());
      await user.updateOne(updateUserDto);
      return { ...user.toJSON(), ...updateUserDto };
    } catch (error) {
      handleErrors(error);
    }
  }

  async remove(id: string) {
    try {
      const { deletedCount } = await this.userModel.deleteOne({ _id: id });
      if( deletedCount === 0 ){
        throw new BadRequestException(`User not found`);
      }
      return;
    } catch (error) {
      handleErrors(error);
    }
  }
}
