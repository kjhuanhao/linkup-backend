import { Controller, Get, Param } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';

@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get(':id')
  async findAl(@Param('id') id: string) {
    return await this.roadmapService.getRoadmap(id);
  }
}
