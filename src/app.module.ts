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
    MongooseModule.forRoot('mongodb://heroku_2sx94z36:6bs6pca3be7vjrdt0kpeo5bppj@ds027489.mlab.com:27489/heroku_2sx94z36'),//mongodb://localhost/quiz-challenge'),
    QuizesModule, AuthModule, QuestionsModule, AnswersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
