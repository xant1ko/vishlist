import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'alex', description: 'Unique login containing letters, digits, _ or -.' })
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]{3,50}$/, { message: 'Login must contain 3 to 50 letters, digits, _ or -' })
  login!: string;

  @ApiProperty({ example: 'secure-password', minLength: 8, maxLength: 128 })
  @IsString()
  password!: string;
}
