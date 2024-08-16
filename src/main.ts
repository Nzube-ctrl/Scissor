import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  app.use(helmet());
  app.enableCors();
  // app.useStaticAssets(join(__dirname, '..', 'public'));
}
bootstrap();
