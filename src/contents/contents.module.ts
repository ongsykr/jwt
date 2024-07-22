import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { ContentsRepository } from './contents.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [ContentsService, ContentsRepository],
  controllers: [ContentsController],
})
export class ContentsModule {}
