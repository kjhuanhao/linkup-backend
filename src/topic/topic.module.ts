import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildTopicEntity, MainTopicEntity } from 'src/entities/topic.entity'
import { ChildTopicService } from 'src/modules/childTopic/child.service'
import { MainTopicService } from 'src/modules/mainTopic/mainTopic.service'
import { MainTopicController } from 'src/modules/mainTopic/mainTopic.controller'

@Module({
  imports: [TypeOrmModule.forFeature([MainTopicEntity, ChildTopicEntity])],
  providers: [MainTopicService, ChildTopicService],
  controllers: [MainTopicController],
  exports: [MainTopicService, ChildTopicService]
})
export class TopicsModule {}
