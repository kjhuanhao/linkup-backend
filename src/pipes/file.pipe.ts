import {
  PipeTransform,
  Injectable,
} from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class FilePipe implements PipeTransform {
  transform(files: UploadFile[]) {
    const arr = files.map((file) => {
      const ext = path.extname(file.originalname);
      return {
        ...file,
        originalName: `${Date.now()}${this.generateRandomNumber()}${ext}`,
      };
    });
    return arr;
  }
  generateRandomNumber(length: number = 6) {
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      result += randomDigit.toString();
    }
    return result;
  }
}
