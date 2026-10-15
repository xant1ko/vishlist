import { Body, Controller, Param, Patch, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { randomBytes } from 'node:crypto';
import type { Request, Response } from 'express';
import { GiftResponseDto } from './dto/gift-response.dto';
import { UpdateGiftReservationDto } from './dto/update-gift-reservation.dto';
import { GiftsService } from './gifts.service';

const reservationCookieName = 'vishlist_reservation_id';
const reservationCookiePath = '/api/v1';

@ApiTags('gift reservations')
@Controller('gifts')
export class GiftReservationsController {
  constructor(
    private readonly giftsService: GiftsService,
    private readonly configService: ConfigService,
  ) {}

  @Patch(':id/reservation')
  @ApiOperation({ summary: 'Забронировать или снять бронь с подарка' })
  @ApiParam({ name: 'id', description: 'Gift ID' })
  @ApiOkResponse({ type: GiftResponseDto })
  @ApiNotFoundResponse({ description: 'Gift not found.' })
  @ApiConflictResponse({ description: 'Gift is already reserved or visitor reached the 3-gift limit.' })
  async updateReservation(
    @Param('id') id: string,
    @Body() dto: UpdateGiftReservationDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<GiftResponseDto> {
    const reservationId = this.getReservationId(request, response);
    return this.giftsService.setReservation(id, reservationId, dto.is_reserved);
  }

  private getReservationId(request: Request, response: Response): string {
    const currentId = request.cookies?.[reservationCookieName];
    if (typeof currentId === 'string' && currentId.length > 0) {
      return currentId;
    }

    const reservationId = randomBytes(32).toString('base64url');
    response.cookie(reservationCookieName, reservationId, {
      httpOnly: true,
      secure: this.configService.get<string>('JWT_COOKIE_SECURE', 'false') === 'true',
      sameSite: 'lax',
      path: reservationCookiePath,
      maxAge: 365 * 24 * 60 * 60 * 1_000,
    });
    return reservationId;
  }
}
