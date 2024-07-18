import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CheckService } from './check.service';
import type { CheckEntity } from 'src/entities/check.entity'

@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @Post()
  create(@Body() checkData: Partial<CheckEntity>) {
    return this.checkService.create(checkData);
  }

  @Get()
  findAll() {
    return this.checkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() checkData: Partial<CheckEntity>) {
    return this.checkService.update(id, checkData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkService.remove(id);
  }
}
