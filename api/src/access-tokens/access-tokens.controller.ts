import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ACCESS_TOKEN_COOKIE_NAME } from '../auth/strategies/jwt.strategy';
import type { AuthenticatedUser } from '../auth/types/auth.type';
import { GiftResponseDto } from '../gifts/dto/gift-response.dto';
import { AccessTokensService } from './access-tokens.service';
import { AccessTokenResponseDto } from './dto/access-token-response.dto';

@ApiTags('gift access tokens')
@Controller('gift-access-tokens')
export class AccessTokensController {
  constructor(private readonly accessTokensService: AccessTokensService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth(ACCESS_TOKEN_COOKIE_NAME)
  @ApiOperation({ summary: 'Создать годовой токен для просмотра своих подарков' })
  @ApiCreatedResponse({ type: AccessTokenResponseDto })
  @ApiUnauthorizedResponse({ description: 'JWT cookie is missing, invalid or expired.' })
  create(@CurrentUser() user: AuthenticatedUser): Promise<AccessTokenResponseDto> {
    return this.accessTokensService.create(user);
  }

  @Get(':token/gifts')
  @ApiOperation({ summary: 'Получить подарки по токену доступа' })
  @ApiParam({ name: 'token', description: 'Годовой токен доступа к подаркам' })
  @ApiOkResponse({ type: GiftResponseDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Токен не найден или истёк.' })
  getSharedGifts(@Param('token') token: string): Promise<GiftResponseDto[]> {
    return this.accessTokensService.getSharedGifts(token);
  }
}
