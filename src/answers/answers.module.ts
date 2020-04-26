import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { QuizesModule } from 'src/quizes/quizes.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerSchema } from './schemas/answer.schema';
import { QuizesService } from 'src/quizes/quizes.service';
import { QuestionsService } from 'src/questions/questions.service';

@Module({
  imports: [QuizesModule, QuestionsModule, MongooseModule.forFeature([{ name: 'Answer', schema: AnswerSchema }])],
  controllers: [AnswersController],
  providers: [AnswersService,]
})
export class AnswersModule {}
