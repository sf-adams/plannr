import mongoose from 'mongoose';
import { UserSchema } from '../users/user.schema';
import * as fs from 'fs/promises';
import * as path from 'path';
import bcrypt from 'bcrypt';

async function loadJSON<T>(filename: string): Promise<T> {
  const file = await fs.readFile(
    path.join(__dirname, 'data', filename),
    'utf-8',
  );
  return JSON.parse(file) as T;
}

export async function seedUsers() {
  const UserModel = mongoose.model('User', UserSchema);

  await UserModel.deleteMany({});
  console.log('\u2714 Cleared users');

  const usersData =
    await loadJSON<{ email: string; password: string }[]>('users.json');

  const hashedUsers = await Promise.all(
    usersData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword,
      };
    }),
  );

  const users = await UserModel.insertMany(hashedUsers);
  console.log('\u2714 Seeded users \n');

  return Object.fromEntries(users.map((u) => [u.email, u._id.toString()]));
}
