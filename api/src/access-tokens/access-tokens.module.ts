import { Module } from '@nestjs/common';
import { GiftsModule } from '../gifts/gifts.module';
import { AccessTokensController } from './access-tokens.controller';
import { AccessTokensRepository } from './access-tokens.repository';
import { AccessTokensService } from './access-tokens.service';

@Module({
  imports: [GiftsModule],
  controllers: [AccessTokensController],
  providers: [AccessTokensRepository, AccessTokensService],
})
export class AccessTokensModule {}
