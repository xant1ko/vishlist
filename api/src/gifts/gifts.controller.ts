import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
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
import { CreateGiftDto } from './dto/create-gift.dto';
import { GiftResponseDto } from './dto/gift-response.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { GiftsService } from './gifts.service';

@ApiTags('gifts')
@ApiCookieAuth(ACCESS_TOKEN_COOKIE_NAME)
@ApiUnauthorizedResponse({ description: 'JWT cookie is missing, invalid or expired.' })
@UseGuards(JwtAuthGuard)
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a gift for the current user' })
  @ApiCreatedResponse({ type: GiftResponseDto })
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateGiftDto): Promise<GiftResponseDto> {
    return this.giftsService.create(user, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get gifts belonging to the current user' })
  @ApiOkResponse({ type: GiftResponseDto, isArray: true })
  findAll(@CurrentUser() user: AuthenticatedUser): Promise<GiftResponseDto[]> {
    return this.giftsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one gift belonging to the current user' })
  @ApiParam({ name: 'id', description: 'Gift ID' })
  @ApiOkResponse({ type: GiftResponseDto })
  @ApiNotFoundResponse({ description: 'Gift not found.' })
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string): Promise<GiftResponseDto> {
    return this.giftsService.findOne(user, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one gift belonging to the current user' })
  @ApiParam({ name: 'id', description: 'Gift ID' })
  @ApiOkResponse({ type: GiftResponseDto })
  @ApiNotFoundResponse({ description: 'Gift not found.' })
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateGiftDto,
  ): Promise<GiftResponseDto> {
    return this.giftsService.update(user, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete one gift belonging to the current user' })
  @ApiParam({ name: 'id', description: 'Gift ID' })
  @ApiNoContentResponse({ description: 'Gift deleted.' })
  @ApiNotFoundResponse({ description: 'Gift not found.' })
  async remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string): Promise<void> {
    await this.giftsService.remove(user, id);
  }
}
