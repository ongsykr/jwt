import { Injectable } from '@nestjs/common';
import { ContentsRepository } from './contents.repository';
import { title } from 'process';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class ContentsService {
  constructor(private contentsRepository: ContentsRepository) {}

  @ApiOperation({ summary: 'create Content' })
  @ApiResponse({ status: 201, description: 'success' })
  create(title: string, body: string) {
    return this.contentsRepository.create(title, body);
  }

  @ApiOperation({ summary: 'delete content' })
  @ApiResponse({ status: 201, description: 'success' })
  async delete(title: string) {
    let content = await this.contentsRepository.findContentByTitle(title);
    let contentId = content.uuid;
    return this.contentsRepository.delete(contentId);
  }
}
