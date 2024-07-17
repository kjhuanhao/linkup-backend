import { Injectable } from '@nestjs/common';
import { getApiKeyConfig } from '../utils/conifg';
import axios from 'axios';

@Injectable()
export class LLMService {
  constructor() {}

  async getChatResponse(prompt: string) {
    const url = 'https://api.openai-next.com/v1/chat/completions';
    const headers = {
      Authorization: getApiKeyConfig(),
      'Content-Type': 'application/json',
    };
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    };
    try {
      const response = await axios.post(url, data, { headers: headers });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  // _// 使用示例_
  // getChatGptResponse("Hello, how are you?").then(response => {
  //     console.log(response);
  // });
}
