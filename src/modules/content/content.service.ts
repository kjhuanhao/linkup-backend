import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentEntity } from 'src/entities/content.entity';
import type { Repository } from 'typeorm';
import { ContentDto } from '../../dtos/content.dto';
import { ChildTopicService } from '../childTopic/child.service';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
    private readonly childTopicService: ChildTopicService,
  ) {}

  async getOne(id: string): Promise<any> {
    const content = await this.contentRepository.findOneBy({ id });
    return content;
  }

  async create(@Body() contentDto: ContentDto) {
    const contentEntity = this.contentRepository.create(contentDto);
    return this.contentRepository.save(contentEntity);
  }

  async test() {
    console.log(2131212);
    
    const all = await this.childTopicService.findAll();
    console.log(all);
    
    for (const item of all) {
      item.contentId = (
        await this.contentRepository.findOneBy({ title: item.name.trim() })
      ).id;
      console.log(await this.contentRepository.findOneBy({ title: item.name.trim() }), '123');
      await this.childTopicService.create(item)
    }
  }
}
