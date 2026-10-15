import { Injectable, NotFoundException } from '@nestjs/common';
import { createHash, randomBytes } from 'node:crypto';
import { ObjectId } from 'mongodb';
import type { AuthenticatedUser } from '../auth/types/auth.type';
import { GiftsService } from '../gifts/gifts.service';
import type { GiftPublic } from '../gifts/types/gift.type';
import { UsersService } from '../users/users.service';
import { AccessTokensRepository } from './access-tokens.repository';
import type { AccessTokenPublic } from './types/access-token.type';

const ACCESS_TOKEN_TTL_MS = 365 * 24 * 60 * 60 * 1_000;

@Injectable()
export class AccessTokensService {
  constructor(
    private readonly accessTokensRepository: AccessTokensRepository,
    private readonly giftsService: GiftsService,
    private readonly usersService: UsersService,
  ) {}

  async create(owner: AuthenticatedUser): Promise<AccessTokenPublic> {
    const token = randomBytes(32).toString('base64url');
    const expiresAt = new Date(Date.now() + ACCESS_TOKEN_TTL_MS);
    await this.accessTokensRepository.create(new ObjectId(owner.id), this.hashToken(token), expiresAt);
    return { token, expires_at: expiresAt };
  }

  async getSharedGifts(token: string): Promise<{ login: string; gifts: GiftPublic[] }> {
    const accessToken = await this.accessTokensRepository.findActiveByHash(this.hashToken(token), new Date());
    if (!accessToken) {
      throw new NotFoundException('Access token not found or expired');
    }
    const owner = await this.usersService.findById(accessToken.owner_id.toHexString());
    if (!owner) {
      throw new NotFoundException('Access token not found or expired');
    }

    return {
      login: owner.login,
      gifts: await this.giftsService.findAllByOwnerId(accessToken.owner_id.toHexString()),
    };
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
