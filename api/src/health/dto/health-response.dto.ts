import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({ example: 'ok' })
  status!: 'ok';

  @ApiProperty({ example: 'vishlist-api' })
  service!: string;

  @ApiProperty({ example: '2026-10-15T12:00:00.000Z' })
  timestamp!: string;

  @ApiProperty({ example: 'ok' })
  database!: 'ok';
}
