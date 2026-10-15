import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthResponseDto, AuthUserResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ACCESS_TOKEN_COOKIE_NAME } from './strategies/jwt.strategy';
import type { AuthenticatedUser, AuthResult } from './types/auth.type';

const accessTokenCookiePath = '/api/v1';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiCreatedResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid login or password.' })
  @ApiConflictResponse({ description: 'Login is already in use.' })
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) response: Response): Promise<AuthResponseDto> {
    const result = await this.authService.register(dto);
    this.setAccessTokenCookie(response, result);
    return { user: result.user };
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in using a login and password' })
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid login or password.' })
  @ApiUnauthorizedResponse({ description: 'Invalid login or password.' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response): Promise<AuthResponseDto> {
    const result = await this.authService.login(dto);
    this.setAccessTokenCookie(response, result);
    return { user: result.user };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCookieAuth(ACCESS_TOKEN_COOKIE_NAME)
  @ApiOperation({ summary: 'Log out and remove the authorization cookie' })
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) response: Response): void {
    response.clearCookie(ACCESS_TOKEN_COOKIE_NAME, this.getCookieClearOptions());
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth(ACCESS_TOKEN_COOKIE_NAME)
  @ApiOperation({ summary: 'Get the current user' })
  @ApiOkResponse({ type: AuthUserResponseDto })
  @ApiUnauthorizedResponse({ description: 'JWT cookie is missing, invalid or expired.' })
  me(@CurrentUser() user: AuthenticatedUser): AuthUserResponseDto {
    return user;
  }

  private setAccessTokenCookie(response: Response, result: AuthResult): void {
    response.cookie(ACCESS_TOKEN_COOKIE_NAME, result.access_token, this.getCookieOptions());
  }

  private getCookieOptions(): { httpOnly: true; secure: boolean; sameSite: 'lax'; maxAge: number; path: string } {
    const configuredMaxAge = this.configService.get<string | number>('JWT_COOKIE_MAX_AGE_MS', 86_400_000);
    const maxAge = Number(configuredMaxAge);
    return {
      httpOnly: true,
      secure: this.configService.get<string>('JWT_COOKIE_SECURE', 'false') === 'true',
      sameSite: 'lax',
      maxAge: Number.isFinite(maxAge) && maxAge > 0 ? maxAge : 86_400_000,
      path: accessTokenCookiePath,
    };
  }

  private getCookieClearOptions(): { httpOnly: true; secure: boolean; sameSite: 'lax'; path: string } {
    const { maxAge: _maxAge, ...clearOptions } = this.getCookieOptions();
    return clearOptions;
  }
}
