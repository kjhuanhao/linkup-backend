import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MinioService } from '../../services/minio.service';
import { FilePipe } from '../../pipes/file.pipe';

@Controller('common')
export class CommonController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  @UsePipes(new FilePipe())
  async upload(@UploadedFiles() files: UploadFile[]) {
    return await this.minioService.uploadFilesToTemp(files);
  }

  @Get('getFile')
  async getFile(@Query('name') name: string) {
    const { url } = await this.minioService.getFile(name);
    return url;
  }

}
