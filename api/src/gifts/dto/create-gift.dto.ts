import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateGiftDto {
  @ApiProperty({ example: 'Noise-cancelling headphones' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name!: string;

  @ApiProperty({ example: 'Black, over-ear model' })
  @IsString()
  @MaxLength(2_000)
  description!: string;

  @ApiProperty({ example: ['https://example.com/gift'], type: [String] })
  @IsArray()
  @ArrayMaxSize(20)
  @IsUrl({}, { each: true })
  links!: string[];
}
