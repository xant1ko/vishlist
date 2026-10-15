import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Collection, Db, ObjectId } from 'mongodb';
import { MONGO_DB } from '../database/database.constants';
import type { AccessTokenDocument } from './types/access-token.type';

@Injectable()
export class AccessTokensRepository implements OnModuleInit {
  private readonly collection: Collection<AccessTokenDocument>;

  constructor(@Inject(MONGO_DB) database: Db) {
    this.collection = database.collection<AccessTokenDocument>('gift_access_tokens');
  }

  async onModuleInit(): Promise<void> {
    await Promise.all([
      this.collection.createIndex({ token_hash: 1 }, { name: 'gift_access_tokens_token_hash_unique', unique: true }),
      this.collection.createIndex({ expires_at: 1 }, { name: 'gift_access_tokens_expires_at_ttl', expireAfterSeconds: 0 }),
    ]);
  }

  async create(ownerId: ObjectId, tokenHash: string, expiresAt: Date): Promise<void> {
    await this.collection.insertOne({
      _id: new ObjectId(),
      owner_id: ownerId,
      token_hash: tokenHash,
      expires_at: expiresAt,
      created_at: new Date(),
    });
  }

  findActiveByHash(tokenHash: string, now: Date): Promise<AccessTokenDocument | null> {
    return this.collection.findOne({ token_hash: tokenHash, expires_at: { $gt: now } });
  }
}
