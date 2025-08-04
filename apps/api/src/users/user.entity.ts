import { Exclude } from 'class-transformer';
import { User } from './user.schema';

export class UserEntity {
  id: string;
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
