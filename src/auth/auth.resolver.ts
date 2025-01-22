import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/user.model';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String) // 返回 JWT 令牌
  async login(@Args('loginInput') loginDto: LoginDto): Promise<string> {
    const user: User | null = await this.authService.validateUser(loginDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { access_token } = this.authService.login(user);

    if (!access_token) {
      throw new Error('Failed to generate access token');
    }

    return access_token;
  }

  @Mutation(() => String)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
  ): Promise<string> {
    const { access_token } = await this.authService.register(registerDto);

    if (!access_token) {
      throw new Error('Failed to generate access token');
    }

    return access_token;
  }
}
