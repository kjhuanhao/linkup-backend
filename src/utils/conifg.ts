import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm"

export const getApiKeyConfig = () => {
  const configService = new ConfigService();
  return configService.get<string>("API_KEY");
} 

export const getMysqlConfig = () => {
  const configService = new ConfigService();
  console.log(configService.get<string>('MYSQL', 'localhost'));
  
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: configService.get<string>('MYSQL_HOST', 'localhost'),
    port: configService.get<number>('MYSQL_PORT', 3306),
    username: configService.get<string>('MYSQL_USERNAME', 'myuser'),
    password: configService.get<string>('MYSQL_PASSWORD', 'mypassword'),
    database: configService.get<string>('MYSQL_DATABASE', 'mydatabase'),
    autoLoadEntities: true,
    synchronize: true,
    logger: 'simple-console',
    logging: true,
    charset: 'utf8mb4_bin',
    entities: [__dirname + '../entities/*.entity.{js,ts}'],
  });
};

export const getMongoMYSQLConfig = () => {
  const configService = new ConfigService();
  return configService.get<string>("MONGO_URL");
}