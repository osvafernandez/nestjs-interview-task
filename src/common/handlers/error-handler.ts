import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

export const handleErrors = (error: any) => {
    if( error.code === 11000 ){
      throw new BadRequestException(`User already exists`);
    }
    throw new InternalServerErrorException(`Can't perform the operation`);
  }