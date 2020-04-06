import { Module } from '@nestjs/common';
import { QuizesController } from './quizes.controller';
import { QuizesService } from './quizes.service';

import { quizesProviders } from './quizes.providers';

import { usersProviders } from '../auth/users.providers';

import { DatabaseModule } from 'src/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from './schemas/quiz.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [ AuthModule, 
    MongooseModule.forFeature([{ name: 'Quiz', schema: QuizSchema }]),
    ],
  controllers: [QuizesController],
  providers: [QuizesService],
  //...quizesProviders, ...usersProviders]
})
export class QuizesModule {}
