// main-topic.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MainTopicService } from './mainTopic.service';

@Controller('mainTopics')
export class MainTopicController {
  constructor(private readonly mainTopicService: MainTopicService) {}

  @Get()
  findAll() {
    return this.mainTopicService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mainTopicService.findOne(id);
  // }

  // @Post()
  // create(@Body() mainTopic: Partial<MainTopic>) {
  //   return this.mainTopicService.create(mainTopic);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() mainTopic: Partial<MainTopic>) {
  //   return this.mainTopicService.update(id, mainTopic);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mainTopicService.remove(id);
  // }

  @Post('batch')
  batchCreate(@Body() topicDto: TopicDto) {
    console.log(topicDto);

    return this.mainTopicService.batchCreate(topicDto);
  }
}
