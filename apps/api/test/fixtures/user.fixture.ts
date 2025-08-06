import { Model } from 'mongoose';
import { User } from '../../src/users/user.schema';

export async function createUserFixture(userModel: Model<User>) {
  const user = new userModel({
    email: 'sam@example.com',
    password: 'Text9876',
  });
  await user.save();
  return user;
}
