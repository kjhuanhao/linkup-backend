import { Injectable } from '@nestjs/common';
import { LLMService } from 'src/services/llm.service';

@Injectable()
export class GuideService {
  constructor(private llmService: LLMService) {}
  async getGuide(prompt: string) {
    return this.llmService.getChatResponse(prompt);
  }

  
}
