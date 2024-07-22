import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(id: string, password: string) {
    const user = await this.authRepository.findUser(id);
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('invaild password');
    }

    let accessToken = this.getAccessToken({ user });
    let refreshToken = this.getRefreshToken({ user });

    return { accessToken, refreshToken };
  }

  getRefreshToken({ user }) {
    return this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: this.configService.get<number>('REFRESH_TOKEN_EXPIRES_IN'),
      },
    );
  }

  async create(id: string, password: string) {
    let user = this.authRepository.findUser(id);
    if (!user) {
      throw new ConflictException(`${id} already exists`);
    }

    // const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.authRepository.createUser(id, hashedPassword);
  }

  async refresh(refresh: string) {
    const secret = this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY');
    if (!this.jwtService.verify(refresh, { secret })) {
      throw new UnauthorizedException('Invaild RefreshToken');
    }
    console.log(this.jwtService.verify(refresh, { secret }));
    const data = this.jwtService.decode(refresh);
    console.log(data);
    const user = await this.authRepository.findUser(data.id);
    const newAccess = await this.getAccessToken({ user });
    return newAccess;
  }

  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: this.configService.get<number>('ACCESS_TOKEN_EXPIRES_IN'),
      },
    );
    return accessToken;
  }

  async logout(id: string) {
    const user = await this.authRepository.findUser(id);
    if (!user) {
      throw new ConflictException(`${id} doesn't exist.`);
    }
    return 'success logout';
  }
}
