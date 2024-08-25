import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenResponseDto } from './dto/token-response.dto';

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

    if (registeredUser.password !== loginDto.password)
      throw new UnauthorizedException();

    const payload = { sub: registeredUser.id, email: registeredUser.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
