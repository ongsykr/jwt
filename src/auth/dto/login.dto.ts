import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiProperty({
    example: 'aaa1234',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: '12345677',
    minLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
