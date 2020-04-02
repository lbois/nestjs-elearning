import { Module } from '@nestjs/common';
import { QuizesModule } from './quizes/quizes.module';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [QuizesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
