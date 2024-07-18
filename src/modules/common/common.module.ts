import { Module } from "@nestjs/common"
import { CommonController } from "./common.controller"
import { MinioService } from "src/services/minio.service"

@Module({
  imports: [],
  controllers: [CommonController],
  providers: [MinioService],
  exports: [MinioService]
})
export class CommonModule {}