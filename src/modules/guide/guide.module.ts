import { Module, Post } from '@nestjs/common';
import { GuideController } from './guide.controller';
import { GuideService } from './guide.service';
import { LLMService } from 'src/services/llm.service'

@Module({
  imports: [],
  controllers: [GuideController],
  providers: [GuideService, LLMService],
})
export class GuideModule {}
