import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import type { AuthenticatedUser } from '../auth/types/auth.type';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { GiftsRepository } from './gifts.repository';
import type { GiftDocument, GiftPublic } from './types/gift.type';

@Injectable()
export class GiftsService {
  constructor(private readonly giftsRepository: GiftsRepository) {}

  async create(owner: AuthenticatedUser, dto: CreateGiftDto): Promise<GiftPublic> {
    const gift = await this.giftsRepository.create({
      owner_id: new ObjectId(owner.id),
      name: dto.name.trim(),
      description: dto.description.trim(),
      links: dto.links,
      is_reserved: false,
    });
    return this.toPublic(gift);
  }

  async findAll(owner: AuthenticatedUser): Promise<GiftPublic[]> {
    return this.findAllByOwnerId(owner.id);
  }

  async findAllByOwnerId(ownerId: string): Promise<GiftPublic[]> {
    const gifts = await this.giftsRepository.findAllByOwner(new ObjectId(ownerId));
    return gifts.map(gift => this.toPublic(gift));
  }

  async findOne(owner: AuthenticatedUser, id: string): Promise<GiftPublic> {
    return this.toPublic(await this.findOwnedGift(owner, id));
  }

  async update(owner: AuthenticatedUser, id: string, dto: UpdateGiftDto): Promise<GiftPublic> {
    const giftId = this.toObjectId(id);
    const updatedGift = await this.giftsRepository.updateByIdAndOwner(
      giftId,
      new ObjectId(owner.id),
      this.normalizeUpdate(dto),
    );
    if (!updatedGift) {
      throw new NotFoundException('Gift not found');
    }
    return this.toPublic(updatedGift);
  }

  async remove(owner: AuthenticatedUser, id: string): Promise<void> {
    const wasDeleted = await this.giftsRepository.deleteByIdAndOwner(this.toObjectId(id), new ObjectId(owner.id));
    if (!wasDeleted) {
      throw new NotFoundException('Gift not found');
    }
  }

  async setReservation(id: string, reservationId: string, isReserved: boolean): Promise<GiftPublic> {
    const giftId = this.toObjectId(id);
    if (!isReserved) {
      const gift = await this.giftsRepository.unreserve(giftId);
      if (!gift) {
        throw new NotFoundException('Gift not found');
      }
      return this.toPublic(gift);
    }

    const existingGift = await this.giftsRepository.findById(giftId);
    if (!existingGift) {
      throw new NotFoundException('Gift not found');
    }
    if (existingGift.is_reserved) {
      if (existingGift.reservation_id === reservationId) {
        return this.toPublic(existingGift);
      }
      throw new ConflictException('Gift is already reserved');
    }

    const reservedCount = await this.giftsRepository.countReservedBy(reservationId);
    if (reservedCount >= 3) {
      throw new ConflictException('A visitor cannot reserve more than 3 gifts');
    }

    const gift = await this.giftsRepository.reserve(giftId, reservationId);
    if (!gift) {
      throw new ConflictException('Gift is already reserved');
    }
    return this.toPublic(gift);
  }

  private async findOwnedGift(owner: AuthenticatedUser, id: string): Promise<GiftDocument> {
    const gift = await this.giftsRepository.findByIdAndOwner(this.toObjectId(id), new ObjectId(owner.id));
    if (!gift) {
      throw new NotFoundException('Gift not found');
    }
    return gift;
  }

  private toObjectId(id: string): ObjectId {
    if (!ObjectId.isValid(id)) {
      throw new NotFoundException('Gift not found');
    }
    return new ObjectId(id);
  }

  private normalizeUpdate(dto: UpdateGiftDto): UpdateGiftDto {
    return {
      ...(dto.name === undefined ? {} : { name: dto.name.trim() }),
      ...(dto.description === undefined ? {} : { description: dto.description.trim() }),
      ...(dto.links === undefined ? {} : { links: dto.links }),
    };
  }

  private toPublic(gift: GiftDocument): GiftPublic {
    return {
      id: gift._id.toHexString(),
      name: gift.name,
      description: gift.description,
      links: gift.links,
      is_reserved: gift.is_reserved === true,
      created_at: gift.created_at,
      updated_at: gift.updated_at,
    };
  }
}
