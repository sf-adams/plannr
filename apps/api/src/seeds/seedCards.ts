import mongoose, { Types } from 'mongoose';
import { CardSchema } from '../cards/card.schema';
import * as fs from 'fs/promises';
import * as path from 'path';

async function loadJSON<T>(filename: string): Promise<T> {
  const file = await fs.readFile(
    path.join(__dirname, 'data', filename),
    'utf-8',
  );
  return JSON.parse(file) as T;
}

interface CardDoc {
  title: string;
  description?: string;
  listTitle: string;
  order: number;
}

export async function seedCards(
  listMap: Record<string, string>,
): Promise<void> {
  const CardModel = mongoose.model('Card', CardSchema);

  await CardModel.deleteMany({});
  console.log('\u2714 Cleared cards');

  const cardsData = await loadJSON<CardDoc[]>('cards.json');

  await Promise.all(
    cardsData.map(async (c) => {
      const listId = listMap[c.listTitle];
      if (!listId) {
        throw new Error(`List with title "${c.listTitle}" not found`);
      }

      return CardModel.create({
        title: c.title,
        description: c.description,
        order: c.order,
        list: new Types.ObjectId(listId),
      });
    }),
  );

  console.log('\u2714 Seeded cards \n');
}
