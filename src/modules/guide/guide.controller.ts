import { Body, Controller, Post } from '@nestjs/common';
import { GuideService } from './guide.service';
import type { CreateGuideDto } from 'src/dtos/guide.dto';

@Controller('guide')
export class GuideController {
  constructor(private guideService: GuideService) {}
  @Post('getGuide')
  async getGuide(@Body() createGuideDto: CreateGuideDto[]) {
    const qa = createGuideDto.map((item) => {
      return `Q: ${item.question} A: ${item.answer}`;
    });
    const variables = {};
    // TODO
    return await this.guideService.getGuide("123");
  }
}
