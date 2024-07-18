import { Injectable } from '@nestjs/common';  
import { InjectRepository } from '@nestjs/typeorm';  
import { CheckEntity } from 'src/entities/check.entity'
import { Repository } from 'typeorm';  

@Injectable()  
export class CheckService {  
  constructor(  
    @InjectRepository(CheckEntity)  
    private checkRepository: Repository<CheckEntity>,  
  ) {}  

  create(checkData: Partial<CheckEntity>): Promise<CheckEntity> {  
    const check = this.checkRepository.create(checkData);  
    return this.checkRepository.save(check);  
  }  

  findAll(): Promise<CheckEntity[]> {  
    return this.checkRepository.find();  
  }  

  findOne(id: string): Promise<CheckEntity> {  
    return this.checkRepository.findOne({ where: { id } });  
  }  

  async update(id: string, checkData: Partial<CheckEntity>): Promise<CheckEntity> {  
    await this.checkRepository.update(id, checkData);  
    return this.checkRepository.findOne({ where: { id } });  
  }  

  async remove(id: string): Promise<void> {  
    await this.checkRepository.delete(id);  
  }  
}