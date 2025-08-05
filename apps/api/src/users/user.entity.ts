import { Exclude, Expose } from 'class-transformer';
import { User } from './user.schema';
import { Types } from 'mongoose';

export class UserEntity {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  _id?: any;

  @Exclude()
  __v?: any;

  constructor(partial: Partial<User & { _id?: Types.ObjectId }>) {
    Object.assign(this, partial);
    if (partial._id) {
      this.id = partial._id.toString();
    }
  }
}
