import { ObjectId } from 'mongodb';

export type AccessTokenDocument = {
  _id: ObjectId;
  owner_id: ObjectId;
  token_hash: string;
  expires_at: Date;
  created_at: Date;
};

export type AccessTokenPublic = {
  token: string;
  expires_at: Date;
};
