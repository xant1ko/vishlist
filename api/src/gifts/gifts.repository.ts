import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Collection, Db, ObjectId } from 'mongodb';
import { MONGO_DB } from '../database/database.constants';
import type { CreateGiftData, GiftDocument, UpdateGiftData } from './types/gift.type';

@Injectable()
export class GiftsRepository implements OnModuleInit {
  private readonly collection: Collection<GiftDocument>;

  constructor(@Inject(MONGO_DB) database: Db) {
    this.collection = database.collection<GiftDocument>('gifts');
  }

  async onModuleInit(): Promise<void> {
    await this.collection.createIndex({ owner_id: 1, created_at: -1 }, { name: 'gifts_owner_created_at' });
  }

  async create(data: CreateGiftData): Promise<GiftDocument> {
    const now = new Date();
    const gift: GiftDocument = { _id: new ObjectId(), ...data, created_at: now, updated_at: now };
    await this.collection.insertOne(gift);
    return gift;
  }

  countReservedBy(reservationId: string): Promise<number> {
    return this.collection.countDocuments({ reservation_id: reservationId, is_reserved: true });
  }

  findById(id: ObjectId): Promise<GiftDocument | null> {
    return this.collection.findOne({ _id: id });
  }

  async reserve(id: ObjectId, reservationId: string): Promise<GiftDocument | null> {
    return this.collection.findOneAndUpdate(
      { _id: id, is_reserved: { $ne: true } },
      { $set: { is_reserved: true, reservation_id: reservationId, updated_at: new Date() } },
      { returnDocument: 'after' },
    );
  }

  async unreserve(id: ObjectId): Promise<GiftDocument | null> {
    return this.collection.findOneAndUpdate(
      { _id: id },
      { $set: { is_reserved: false, updated_at: new Date() }, $unset: { reservation_id: '' } },
      { returnDocument: 'after' },
    );
  }

  findAllByOwner(ownerId: ObjectId): Promise<GiftDocument[]> {
    return this.collection.find({ owner_id: ownerId }).sort({ created_at: -1 }).toArray();
  }

  findByIdAndOwner(id: ObjectId, ownerId: ObjectId): Promise<GiftDocument | null> {
    return this.collection.findOne({ _id: id, owner_id: ownerId });
  }

  async updateByIdAndOwner(id: ObjectId, ownerId: ObjectId, data: UpdateGiftData): Promise<GiftDocument | null> {
    const result = await this.collection.findOneAndUpdate(
      { _id: id, owner_id: ownerId },
      { $set: { ...data, updated_at: new Date() } },
      { returnDocument: 'after' },
    );
    return result;
  }

  async deleteByIdAndOwner(id: ObjectId, ownerId: ObjectId): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: id, owner_id: ownerId });
    return result.deletedCount === 1;
  }
}
