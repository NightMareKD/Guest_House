import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    // TODO: Implement with database
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    // Mock user creation
    const user = {
      id: '1',
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: 'GUEST',
      password: hashedPassword,
    };

    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    // TODO: Implement with database
    // Mock user lookup
    const mockUser = {
      id: '1',
      email: 'admin@isara.com',
      password: await bcrypt.hash('admin', 10),
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    };

    if (loginDto.email !== mockUser.email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, mockUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: mockUser.email, sub: mockUser.id, role: mockUser.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: mockUser.id,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        role: mockUser.role,
      },
    };
  }
}
