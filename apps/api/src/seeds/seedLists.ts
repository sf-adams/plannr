import mongoose, { Types } from 'mongoose';
import { ListSchema } from '../lists/list.schema';
import * as fs from 'fs/promises';
import * as path from 'path';

async function loadJSON<T>(filename: string): Promise<T> {
  const file = await fs.readFile(
    path.join(__dirname, 'data', filename),
    'utf-8',
  );
  return JSON.parse(file) as T;
}

interface ListDoc {
  title: string;
  boardTitle: string;
}

export async function seedLists(
  boardMap: Record<string, string>,
): Promise<Record<string, string>> {
  const ListModel = mongoose.model('List', ListSchema);

  await ListModel.deleteMany({});
  console.log('\u2714 Cleared lists');

  const listsData = await loadJSON<ListDoc[]>('lists.json');

  const lists = await Promise.all(
    listsData.map(async (l) => {
      const boardId = boardMap[l.boardTitle];
      if (!boardId) {
        throw new Error(`Board with title "${l.boardTitle}" not found`);
      }

      return ListModel.create({
        title: l.title,
        board: new Types.ObjectId(boardId),
      });
    }),
  );

  console.log('\u2714 Seeded lists \n');

  return Object.fromEntries(
    lists.map((l) => [l.title, (l._id as Types.ObjectId).toString()]),
  );
}
