import { Module } from '@nestjs/common';
import { TopicsModule } from 'src/topic/topic.module';
import { RoadmapController } from './roadmap.controller'
import { RoadmapService } from './roadmap.service'

@Module({
  imports: [TopicsModule],
  providers: [RoadmapService],
  controllers: [RoadmapController],
})
export class RoadMapModule {}
