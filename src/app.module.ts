import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GuideModule } from './modules/guide/guide.module';
import { LLMService } from './services/llm.service';
import { MongooseModule } from '@nestjs/mongoose';
import { getMinioConfig, getMongoMYSQLConfig, getMysqlConfig } from './utils/conifg';
import { TopicsModule } from './topic/topic.module'
import { RoadMapModule } from './modules/roadmap/roadmap.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from './interceptors/response.intereptor'
import { GlobalExceptionFilter } from './filters/globalExpection.filter'
import { ContentModule } from './modules/content/content.module'
import { CommonModule } from './modules/common/common.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GuideModule,
    MongooseModule.forRoot(getMongoMYSQLConfig()),
    getMinioConfig(),
    getMysqlConfig(),
    TopicsModule,
    RoadMapModule,
    ContentModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LLMService,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
