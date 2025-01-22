// src/auth/dto/login.dto.ts
import { IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType() // 添加 @InputType() 装饰器
export class LoginDto {
  @Field() // 添加 @Field() 装饰器
  @IsString()
  username: string;

  @Field() // 添加 @Field() 装饰器
  @IsString()
  password: string;
}
