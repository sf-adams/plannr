import mongoose, { Types } from 'mongoose';
import { BoardSchema } from '../boards/board.schema';
import * as fs from 'fs/promises';
import * as path from 'path';

interface BoardSeedData {
  title: string;
  description?: string;
  ownerEmail: string;
  members?: string[];
}

async function loadJSON<T>(filename: string): Promise<T> {
  const file = await fs.readFile(
    path.join(__dirname, 'data', filename),
    'utf-8',
  );
  return JSON.parse(file) as T;
}

export async function seedBoards(
  userMap: Record<string, string>,
): Promise<Record<string, string>> {
  const BoardModel = mongoose.model('Board', BoardSchema);

  await BoardModel.deleteMany({});
  console.log('\u2714 Cleared boards');

  const boardsData = await loadJSON<BoardSeedData[]>('boards.json');

  const boards = await Promise.all(
    boardsData.map(async (board) => {
      const ownerId = userMap[board.ownerEmail];
      if (!ownerId) {
        throw new Error(
          `\u2718 Owner email ${board.ownerEmail} not found in user map`,
        );
      }

      const memberIds = [ownerId];
      for (const email of board.members ?? []) {
        const id = userMap[email];
        if (!id) {
          throw new Error(`\u2718 Member email ${email} not found in user map`);
        }
        if (!memberIds.includes(id)) {
          memberIds.push(id);
        }
      }

      return BoardModel.create({
        title: board.title,
        description: board.description,
        owner: ownerId,
        members: memberIds,
      });
    }),
  );

  console.log('\u2714 Seeded boards \n');

  return Object.fromEntries(
    boards.map((b) => [b.title, (b._id as Types.ObjectId).toString()]),
  );
}
