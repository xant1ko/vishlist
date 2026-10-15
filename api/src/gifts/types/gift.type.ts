import { ObjectId } from 'mongodb';

export type GiftDocument = {
  _id: ObjectId;
  owner_id: ObjectId;
  name: string;
  description: string;
  links: string[];
  is_reserved: boolean;
  reservation_id?: string;
  created_at: Date;
  updated_at: Date;
};

export type GiftPublic = {
  id: string;
  name: string;
  description: string;
  links: string[];
  is_reserved: boolean;
  created_at: Date;
  updated_at: Date;
};

export type CreateGiftData = Pick<GiftDocument, 'owner_id' | 'name' | 'description' | 'links' | 'is_reserved'>;

export type UpdateGiftData = Partial<Pick<GiftDocument, 'name' | 'description' | 'links'>>;
