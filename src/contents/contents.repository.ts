import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentsRepository {
  constructor(private prismaService: PrismaService) {}

  create(title: string, body: string) {
    return this.prismaService.content
      .create({
        data: {
          title,
          body,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error while creating content',
          );
        }
        throw new InternalServerErrorException('unknown error');
      });
  }

  findContentByTitle(title: string) {
    return this.prismaService.content
      .findFirst({
        where: { title },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error while finding content',
          );
        }
        throw new InternalServerErrorException('unknown error');
      });
  }

  delete(uuid: string) {
    return this.prismaService.content
      .delete({
        where: { uuid },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException(
            'database error while deleting content',
          );
        }
        throw new InternalServerErrorException('unknown error');
      });
  }
}
