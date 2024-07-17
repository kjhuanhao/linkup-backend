import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ContentEntity } from "src/entities/content.entity"
import { ContentController } from "./content.controller"
import { ContentService } from "./content.service"
import { TopicsModule } from "src/topic/topic.module"

@Module({
  imports: [TypeOrmModule.forFeature([ContentEntity]), TopicsModule],
  providers: [ContentService],
  controllers: [ContentController],
})
export class ContentModule {}