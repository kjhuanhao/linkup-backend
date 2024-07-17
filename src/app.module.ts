import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GuideModule } from './modules/guide/guide.module';
import { LLMService } from './services/llm.service';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoMYSQLConfig, getMysqlConfig } from './utils/conifg';
import { TopicsModule } from './topic/topic.module'
import { RoadMapModule } from './modules/roadmap/roadmap.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GuideModule,
    MongooseModule.forRoot(getMongoMYSQLConfig()),
    getMysqlConfig(),
    TopicsModule,
    RoadMapModule
  ],
  controllers: [AppController],
  providers: [AppService, LLMService],
})
export class AppModule {}
