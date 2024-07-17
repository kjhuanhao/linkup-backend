import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MainTopicEntity,
  type ChildTopicEntity,
} from '../../entities/topic.entity';
import { ChildTopicService } from 'src/modules/childTopic/child.service';

@Injectable()
export class MainTopicService {
  constructor(
    @InjectRepository(MainTopicEntity)
    private mainTopicEntityRepository: Repository<MainTopicEntity>,
    private childTopicService: ChildTopicService,
  ) {}

  async findAll(): Promise<MainTopicEntity[]> {
    return this.mainTopicEntityRepository.find();
  }

  async findOne(id: string): Promise<MainTopicEntity> {
    return this.mainTopicEntityRepository.findOneBy({ id });
  }

  async create(
    MainTopicEntity: Partial<MainTopicEntity>,
  ): Promise<MainTopicEntity> {
    const newMainTopicEntity =
      this.mainTopicEntityRepository.create(MainTopicEntity);
    return this.mainTopicEntityRepository.save(newMainTopicEntity);
  }

  async update(
    id: string,
    MainTopicEntity: Partial<MainTopicEntity>,
  ): Promise<MainTopicEntity> {
    await this.mainTopicEntityRepository.update(id, MainTopicEntity);
    return this.mainTopicEntityRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.mainTopicEntityRepository.delete(id);
  }

  async batchCreate(topicDto: TopicDto) {
    // TODO: generate data
    // 创建MainTopicEntity实体
    const mainTopicEntity = this.mainTopicEntityRepository.save({
      name: topicDto.data.name,
      emoji: topicDto.data.emoji,
    });
    const mainTopicId = (await mainTopicEntity).id;
    console.log(mainTopicId, 'main_topic');
    
    for (const item of topicDto.children) {
      const firstChild: Omit<ChildTopicEntity, 'id'> = {
        name: item.data.name,
        emoji: item.data.emoji,
        lastTopicId: mainTopicId,
        contentId: null,
        mainTopicId,
      };
      const firstChildEntity = await this.childTopicService.create(firstChild);
      let lastChild = firstChildEntity;
      for (const children of item.children) {
        const lastChildEntity = await this.childTopicService.create({
          ...children.data,
          lastTopicId: lastChild.id,
          mainTopicId,
        });
        lastChild = lastChildEntity;
      }
    }
    return 'success'
  }
}
