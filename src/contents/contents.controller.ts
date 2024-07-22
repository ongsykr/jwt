import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { createContentsDto } from './dto/createContents.dto';
import { AuthGuard } from 'src/auth/Guard/auth.guard';

@Controller('contents')
export class ContentsController {
  constructor(private contentsService: ContentsService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Body() body: createContentsDto) {
    return this.contentsService.create(body.title, body.body);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete')
  delete(@Body() title: string) {
    return this.contentsService.delete(title);
  }
}
