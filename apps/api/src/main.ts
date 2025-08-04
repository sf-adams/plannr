import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') ?? 3000);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}
void bootstrap();
