import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';
import { JwtPayload } from './jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): { access_token: string } {
    const payload: JwtPayload = { username: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const user = await this.usersService.findOne(loginDto.username);

    // 检查用户是否存在
    if (!user) {
      return null; // 用户未找到，返回 null
    }

    // 检查密码是否有效
    if (user.password != null) {
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        return null; // 密码无效，返回 null
      }
    }

    // 返回用户信息，排除密码字段
    const result = user.toObject() as User;
    delete result.password;
    return result; // 确保返回类型为 User
  }

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    const payload: JwtPayload = { username: registerDto.name };
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    await this.usersService.createUser(
      registerDto.name,
      registerDto.email,
      hashedPassword,
    );
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
