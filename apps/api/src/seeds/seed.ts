import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import { seedUsers } from './seedUsers';
import { seedBoards } from './seedBoards';
import { seedLists } from './seedLists';
import { seedCards } from './seedCards';

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('\n Connected to MongoDB...');

    const userMap = await seedUsers();
    const boardMap = await seedBoards(userMap);
    const listMap = await seedLists(boardMap);
    await seedCards(listMap);

    console.log('\u2714 All data seeded successfully');
  } catch (error) {
    console.error('\u2718 Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('...Disconnected from MongoDB \n');
  }
}

void seed();
