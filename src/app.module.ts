import { Module } from '@nestjs/common';
import { QuizesModule } from './quizes/quizes.module';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/quiz-challenge'),
    QuizesModule, AuthModule, QuestionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
