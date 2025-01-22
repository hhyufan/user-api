// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; // 导入 ApolloDriver
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

// src/app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/user'), // 连接到 MongoDB 数据库
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }: { req: Request }) => ({ req }),
      path: process.env.GRAPHQL_PATH ?? '/graphql',
    }),
    UsersModule,
    AuthModule, // 确保 AuthModule 被导入
  ],
})
export class AppModule {}
