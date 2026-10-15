import { ApiProperty } from '@nestjs/swagger';
import { GiftResponseDto } from '../../gifts/dto/gift-response.dto';

export class SharedGiftsResponseDto {
  @ApiProperty({ example: 'alex', description: 'Логин пользователя, который поделился подарками.' })
  login!: string;

  @ApiProperty({ type: GiftResponseDto, isArray: true })
  gifts!: GiftResponseDto[];
}
