import { Module } from '@nestjs/common';
import { GiftsController } from './gifts.controller';
import { GiftsRepository } from './gifts.repository';
import { GiftsService } from './gifts.service';

@Module({
  controllers: [GiftsController],
  providers: [GiftsRepository, GiftsService],
})
export class GiftsModule {}
