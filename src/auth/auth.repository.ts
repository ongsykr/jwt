import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthRepository {
  constructor(
    private prsimaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(id: string, password: string) {
    let user = await this.prsimaService.user.findUnique({ where: { id } });

    if (user) {
      throw new ConflictException(`${user.id} already exists`);
    }

    return this.prsimaService.user.create({
      data: {
        id,
        password,
      },
    });
  }

  async getAccessToken({ user }) {
    return this.jwtService.sign(
      {
        id: user.id,
        password: user.password,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: '1h',
      },
    );
  }

  async getRefreshToken({ user }) {
    return this.jwtService.sign(
      {
        id: user.id,
        password: user.password,
      },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: '1d',
      },
    );
  }

  async login(id: string, password: string) {
    const user = await this.prsimaService.user.findUniqueOrThrow({
      where: { id },
    });

    if (password !== user.password) {
      throw new UnauthorizedException('invaild password');
    }

    let accessToken = this.getAccessToken({ user });
    let refreshToken = this.getRefreshToken({ user });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken) {
    const newAccess = await this.getAccessToken();
  }
}
