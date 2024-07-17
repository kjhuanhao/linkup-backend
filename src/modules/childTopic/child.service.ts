// child-topic.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildTopicEntity } from 'src/entities/topic.entity'
import { Repository } from 'typeorm';

@Injectable()
export class ChildTopicService {
  constructor(
    @InjectRepository(ChildTopicEntity)
    private childTopicEntityRepository: Repository<ChildTopicEntity>,
  ) {}

  async findAll(): Promise<ChildTopicEntity[]> {
    return this.childTopicEntityRepository.find();
  }

  async findOne(id: string): Promise<ChildTopicEntity> {
    return this.childTopicEntityRepository.findOneBy({id});
  }

  async findMayByMainTopicId(id: string): Promise<ChildTopicEntity[]> {
    return this.childTopicEntityRepository.find({where: {mainTopicId: id}});
  }

  async create(ChildTopicEntity: Partial<ChildTopicEntity>): Promise<ChildTopicEntity> {
    const newChildTopicEntity = this.childTopicEntityRepository.create(ChildTopicEntity);
    return this.childTopicEntityRepository.save(newChildTopicEntity);
  }

  async update(
    id: string,
    ChildTopicEntity: Partial<ChildTopicEntity>,
  ): Promise<ChildTopicEntity> {
    await this.childTopicEntityRepository.update(id, ChildTopicEntity);
    return this.childTopicEntityRepository.findOneBy({id})
  }

  async remove(id: string): Promise<void> {
    await this.childTopicEntityRepository.delete(id);
  }
}
