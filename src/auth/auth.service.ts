import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenResponseDto } from './dto/token-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<TokenResponseDto> {
    const registeredUser = await this.usersService.findOneByEmail(
      registerDto.email,
    );
    if (registeredUser !== null) {
      throw new ConflictException(`Email ${registerDto.email} already exists`);
    }

    const newUser = await this.usersService.create(registerDto);
    const payload = { sub: newUser.id, email: newUser.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async login(loginDto: LoginDto): Promise<TokenResponseDto> {
    const registeredUser = await this.usersService.findOneByEmail(
      loginDto.email,
    );
    if (registeredUser === null)
      throw new ConflictException(`Email ${loginDto.email} does not exist`);

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      registeredUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: registeredUser.id, email: registeredUser.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
