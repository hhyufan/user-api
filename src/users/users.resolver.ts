// src/users/users.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt')) // 使用 JWT 认证守卫
  @Query(() => [User])
  async users() {
    return this.usersService.findAll();
  }
  @Query(() => User)
  async user(@Args('id') id: string) {
    return this.usersService.findOneById(id);
  }
}
