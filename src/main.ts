import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let port = process.env.PORT || 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(port);
}
bootstrap();
