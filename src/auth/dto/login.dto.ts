import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class loginDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
