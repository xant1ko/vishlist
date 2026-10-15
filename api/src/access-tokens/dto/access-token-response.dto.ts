import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponseDto {
  @ApiProperty({
    example: '8HfmJxcK9lwxgEZYzZpB6IiYjMe91TAyk37LEBhFiZs',
    description: 'Токен для передачи другому человеку. Показывается только при создании.',
  })
  token!: string;

  @ApiProperty({ example: '2027-10-15T12:00:00.000Z', format: 'date-time' })
  expires_at!: Date;
}
