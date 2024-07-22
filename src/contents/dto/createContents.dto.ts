import {
  IsNotEmpty,
  IsString,
  maxLength,
  MaxLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createContentsDto {
  @ApiProperty({ maxLength: 30 })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body: string;
}
