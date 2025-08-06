import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

export async function connectInMemoryDB() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
}

export async function closeInMemoryDB() {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
}

export async function clearInMemoryDB() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    if (collection) {
      try {
        // Drop the collection entirely to reset everything, including indexes/data
        await collection.drop();
      } catch (err) {
        // Ignore errors about "ns not found" (collection doesn't exist yet)
        if (err.message !== 'ns not found') {
          throw err;
        }
      }
    }
  }
}
