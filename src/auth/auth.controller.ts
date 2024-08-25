import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { SkipAuth } from './skip-auth.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @SkipAuth()
  async register(@Body() registerDto: RegisterDto): Promise<TokenResponseDto> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @SkipAuth()
  async login(@Body() loginDto: LoginDto): Promise<TokenResponseDto> {
    return await this.authService.login(loginDto);
  }
}
