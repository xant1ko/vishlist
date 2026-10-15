import { ApiProperty } from '@nestjs/swagger';

export class GiftResponseDto {
  @ApiProperty({ example: '66e4fa78469290f19f5642b1' })
  id!: string;

  @ApiProperty({ example: 'Noise-cancelling headphones' })
  name!: string;

  @ApiProperty({ example: 'Black, over-ear model' })
  description!: string;

  @ApiProperty({ example: ['https://example.com/gift'], type: [String] })
  links!: string[];

  @ApiProperty({ example: false, description: 'Забронирован ли подарок.' })
  is_reserved!: boolean;

  @ApiProperty({ example: '2026-10-15T10:00:00.000Z', format: 'date-time' })
  created_at!: Date;

  @ApiProperty({ example: '2026-10-15T10:00:00.000Z', format: 'date-time' })
  updated_at!: Date;
}
