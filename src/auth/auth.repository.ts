import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthRepository {
  constructor(private prsimaService: PrismaService) {}

  async createUser(id: string, password: string) {
    return this.prsimaService.user
      .create({
        data: {
          id,
          password,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ConflictException(`User ${id} already exists.`);
          }
        }
        throw new InternalServerErrorException('Unknown error');
      });
  }

  findUser(id: string) {
    return this.prsimaService.user
      .findUnique({ where: { id } })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('database error');
        }
        throw new InternalServerErrorException('unknown error');
      });
  }
}
