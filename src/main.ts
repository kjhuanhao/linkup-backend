import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api')
  app.enableCors({
    origin: true,
    methods: 'GET,PUT,POST',
    // allowedHeaders: 'Content-Type,Authorization',
    // exposedHeaders: 'Content-Range,X-Content-Range',
    credentials: true,
    maxAge: 4800,
  });
  await app.listen(8080);
}
bootstrap();
