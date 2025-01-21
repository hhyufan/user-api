// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; // 导入 ApolloDriver
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/user'), // 连接到 MongoDB 数据库
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // 添加 ApolloDriverConfig 类型
      driver: ApolloDriver, // 添加 driver 选项
      autoSchemaFile: true, // 自动生成 GraphQL 架构文件
    }),
    UsersModule,
  ],
})
export class AppModule {}
