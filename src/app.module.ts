import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// 导入 MongoService
import * as path from 'node:path';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo/mongo.service'; // 导入 MongoService
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(__dirname, '../.env'), // 加载 .env 文件
        path.resolve(__dirname, '../.env.data'), // 加载 .env.data 文件
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('DATABASE_NAME'),
      }),
      inject: [ConfigService],
    }), // 连接到 MongoDB 数据库
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }: { req: Request }) => ({ req }),
      path: process.env.GRAPHQL_PATH ?? '/graphql',
    }),
    UsersModule,
    AuthModule, // 确保 AuthModule 被导入
  ],
  providers: [MongoService], // 提供 MongoService
})
export class AppModule {}
