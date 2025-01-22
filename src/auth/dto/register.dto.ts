// src/auth/dto/register.dto.ts
import { IsString, IsEmail } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType() // 添加 @InputType() 装饰器
export class RegisterDto {
  @Field() // 添加 @Field() 装饰器
  @IsString()
  name: string;

  @Field() // 添加 @Field() 装饰器
  @IsEmail()
  email: string;

  @Field() // 添加 @Field() 装饰器
  @IsString()
  password: string;
}
