import { Injectable } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import * as minio from 'minio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
  private static readonly bucketName = 'zeabur';
  constructor(@InjectMinio() private readonly minioClient: minio.Client) {}

  /**
   * 文件上传到临时存储桶
   * @param files
   * @returns
   */
  async uploadFilesToTemp(files: UploadFile[]): Promise<string[]> {
    console.log(files);
    
    const upload = async (file: UploadFile) => {
      await this.minioClient.putObject(
        MinioService.bucketName,
        file.originalname,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
        },
      );
      return this.getFileUrl(MinioService.bucketName, file.originalname);
    };
    const res = await Promise.all(files.map(upload));
    return res;
  }


  /**
   * 获取文件 url
   * @param bucketName
   * @param objectName
   * @returns
   */
  private getFileUrl = (bucketName: string, objectName: string) => {
    const configService = new ConfigService();
    const url = configService.get('MINIO_URL', '');
    return `${url}/${bucketName}/${objectName}`;
  };

  /**
   * 获取文件
   * @param objectName
   * @param fromTemp 是否从临时存储桶获取
   * @returns
   */
  async getFile(objectName: string) {
    const bucketName = MinioService.bucketName;
    const [url, stat] = await Promise.all([
      this.minioClient.presignedGetObject(bucketName, objectName, 24 * 60 * 60),
      this.minioClient.statObject(bucketName, objectName),
    ]);
    return { url, stat };
  }
}
