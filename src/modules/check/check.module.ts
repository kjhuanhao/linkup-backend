import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckController } from './check.controller';
import { CheckService } from './check.service';
import { CheckEntity } from 'src/entities/check.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CheckEntity])],
  controllers: [CheckController],
  providers: [CheckService],
})
export class CheckModule {}
