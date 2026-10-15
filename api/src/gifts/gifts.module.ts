import { Module } from '@nestjs/common';
import { GiftsController } from './gifts.controller';
import { GiftReservationsController } from './gift-reservations.controller';
import { GiftsRepository } from './gifts.repository';
import { GiftsService } from './gifts.service';

@Module({
  controllers: [GiftsController, GiftReservationsController],
  providers: [GiftsRepository, GiftsService],
  exports: [GiftsService],
})
export class GiftsModule {}
