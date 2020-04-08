import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { MongooseModule } from '@nestjs/mongoose';
import {QuestionSchema } from './schemas/question.schema'
import { QuizesModule } from 'src/quizes/quizes.module';

@Module({
  imports: [QuizesModule, MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }])],
  controllers: [QuestionsController],
  providers: [QuestionsService]
})
export class QuestionsModule {}
