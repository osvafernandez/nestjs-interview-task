import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
   @ApiProperty({ description: 'Limit of search', required: false })
   @IsOptional()
   @IsPositive()
   @Min(1)
   limit?: number;
}