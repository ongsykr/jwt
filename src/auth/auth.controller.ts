import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() body: loginDto) {
    return this.authService.login(body.id, body.password);
  }

  @Post('/create')
  createUser(@Body() body: loginDto) {
    return this.authService.create(body.id, body.password);
  }

  // @Post('/refresh')
  // refresh(@Body() body: string) {
  //   return this.authService.refresh(body);
  // }
}
