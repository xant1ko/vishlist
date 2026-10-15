import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdateGiftDto {
  @ApiPropertyOptional({ example: 'Noise-cancelling headphones' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name?: string;

  @ApiPropertyOptional({ example: 'Black, over-ear model' })
  @IsOptional()
  @IsString()
  @MaxLength(2_000)
  description?: string;

  @ApiPropertyOptional({ example: ['https://example.com/gift'], type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsUrl({}, { each: true })
  links?: string[];
}
