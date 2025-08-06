import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Server } from 'http';
import { getModelToken, getConnectionToken } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User } from '../src/users/user.schema';
import {
  connectInMemoryDB,
  closeInMemoryDB,
  clearInMemoryDB,
} from './setup-mongodb';

import { createUserFixture } from './fixtures/user.fixture';

interface LoginResponse {
  access_token: string;
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let userModel: Model<User>;
  let connection: Connection;

  beforeAll(async () => {
    await connectInMemoryDB();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));
    connection = moduleFixture.get<Connection>(getConnectionToken());
  });

  // Clear using the Nest app's mongoose connection, NOT global mongoose.connection
  async function clearNestConnectionDB() {
    for (const key in connection.collections) {
      try {
        await connection.collections[key].drop();
      } catch (err: any) {
        // Ignore if collection does not exist
        if (
          err.message !== 'ns not found' &&
          err.message !== 'NamespaceNotFound'
        ) {
          throw err;
        }
      }
    }
  }

  beforeEach(async () => {
    console.log('Clearing DB...');
    await clearNestConnectionDB();
    console.log('DB cleared. Creating user fixture...');
    await createUserFixture(userModel);
    console.log('User fixture created.');

    const loginResponse = await request(app.getHttpServer() as Server)
      .post('/auth/login')
      .send({ email: 'sam@example.com', password: 'Text9876' })
      .expect(200);

    const body = loginResponse.body as LoginResponse;
    jwtToken = body.access_token;
  });

  afterAll(async () => {
    await app.close();
    await closeInMemoryDB();
  });

  it('/ (GET) - protected route', () => {
    return request(app.getHttpServer() as Server)
      .get('/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });
});
