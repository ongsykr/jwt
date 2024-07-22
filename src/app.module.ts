import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ContentsService } from './contents/contents.service';
import { ContentsController } from './contents/contents.controller';
import { ContentsModule } from './contents/contents.module';
import { ContentsRepository } from './contents/contents.repository';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ContentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
