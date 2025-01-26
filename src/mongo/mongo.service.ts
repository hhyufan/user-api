// src/mongo/mongo.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ConfigService } from '@nestjs/config';
import { HttpProxyAgent } from 'http-proxy-agent';

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const uri = this.configService.get<string>('MONGODB_URI');
    const proxy = new HttpProxyAgent(
      this.configService.get<string>('HTTP_PROXY') || '',
    );
    console.log('proxy', proxy);
    // 创建 MongoClient 实例
    const options = {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    };

    this.client = new MongoClient(typeof uri === 'string' ? uri : '', options);

    try {
      await this.client.connect();
      await this.client.db('admin').command({ ping: 1 });
      console.log('Successfully connected to MongoDB!');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
    }
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
