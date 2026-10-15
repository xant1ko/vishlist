import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateGiftReservationDto {
  @ApiProperty({ example: true, description: 'Статус бронирования подарка.' })
  @IsBoolean()
  is_reserved!: boolean;
}
