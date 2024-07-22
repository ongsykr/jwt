import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { refreshTokenDto } from './dto/refreshToken.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('login API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'login',
    description: 'Enter your id and password to log in.',
  })
  @ApiBody({ type: loginDto })
  @ApiResponse({ status: 201, description: 'success' })
  login(@Body() body: loginDto) {
    return this.authService.login(body.id, body.password);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'sign in',
    description: 'Enter your id and password to sign in.',
  })
  @ApiBody({ type: loginDto })
  @ApiResponse({ status: 201, description: 'success' })
  createUser(@Body() body: loginDto) {
    return this.authService.create(body.id, body.password);
  }

  @Post('/refresh')
  @ApiOperation({
    summary: 'refresh token',
    description: 'Enter your refresh token to get new access token.',
  })
  @ApiBody({ type: refreshTokenDto })
  @ApiResponse({ status: 201, description: 'success' })
  refresh(@Body() body: refreshTokenDto) {
    return this.authService.refresh(body.refresh);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'log out' })
  @ApiBody({ type: loginDto })
  @ApiResponse({ status: 201, description: 'success' })
  logout(@Body() body: loginDto) {
    return this.authService.logout(body.id);
  }
}
