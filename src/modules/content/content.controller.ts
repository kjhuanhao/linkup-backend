import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContentService } from './content.service';
import type { ContentDto } from 'src/dtos/content.dto';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get(':id')
  async getContent(@Param('id') id: string) {
    return await this.contentService.getOne(id);
  }

  @Post('create')
  async createContent(@Body() contentDto: ContentDto) {
    return await this.contentService.create(contentDto);
  }

  @Post()
  async test() {
    console.log(1213);
    return await this.contentService.test();
  }
}
