import { Module, forwardRef } from '@nestjs/common';
import { QuizesController } from './quizes.controller';
import { QuizesService } from './quizes.service';

import { quizesProviders } from './quizes.providers';

import { usersProviders } from '../auth/users.providers';

import { DatabaseModule } from 'src/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from './schemas/quiz.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { QuestionsModule } from 'src/questions/questions.module';
import { QuestionSchema } from 'src/questions/schemas/question.schema';
import { QuestionsService } from 'src/questions/questions.service';

@Module({
  imports: [ AuthModule,
    MongooseModule.forFeature([{ name: 'Quiz', schema: QuizSchema }]),
    ],
  controllers: [QuizesController],
  providers: [QuizesService],
  //...quizesProviders, ...usersProviders]
  exports: [QuizesService, AuthModule]
})
export class QuizesModule {}
