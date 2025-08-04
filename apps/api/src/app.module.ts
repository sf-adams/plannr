import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/plannr'),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
