import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel( User.name )
    private readonly userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.name = createUserDto.name.toLocaleLowerCase();
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().select('-__v -password').lean();
      return users;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      if( !isValidObjectId(id) ){
        throw new BadRequestException(`The id: ${id} is not a valid id`);
      }
      let user: User = await this.userModel.findById(id);
      if( !user ) throw new NotFoundException();
      return user;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if( !user ){
        throw new NotFoundException(`User with id ${id} not found`);
      }
      updateUserDto.name = updateUserDto.name.toLocaleLowerCase();
      await user.updateOne(updateUserDto);
      return { ...user.toJSON(), ...updateUserDto };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string) {
    try {
      const result = this.userModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  private handleErrors(error: any){
    if( error.code === 11000 ){
      throw new BadRequestException(`User already exists`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't perform the operation`);
  }
}
