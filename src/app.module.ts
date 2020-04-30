import { Module } from '@nestjs/common';
import { QuizesModule } from './quizes/quizes.module';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/quiz-challenge'),
    QuizesModule, AuthModule, QuestionsModule, AnswersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
