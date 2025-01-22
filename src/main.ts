import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.PORT ?? 3000;
const path = process.env.GRAPHQL_PATH ?? '/graphql';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
(async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 启用全局验证管道
  app.use(helmet());
  try {
    await app.listen(PORT, () =>
      // 34. 启动 Express 应用并监听指定端口
      console.log(`GraphQL Server running at http://localhost:${PORT}${path}!`),
    );
  } catch (error) {
    console.error(error);
  }
})().catch(() => {});
