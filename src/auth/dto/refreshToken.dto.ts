import { IsNotEmpty, IsString, isNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class refreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refresh: string;
}
