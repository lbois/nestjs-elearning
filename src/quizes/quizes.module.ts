import { Module } from '@nestjs/common';
import { QuizesController } from './quizes.controller';
import { QuizesService } from './quizes.service';

import { quizesProviders } from './quizes.providers';

import { usersProviders } from '../auth/users.providers';

import { DatabaseModule } from 'src/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [QuizesController],
  providers: [QuizesService,
  ...quizesProviders, ...usersProviders]
})
export class QuizesModule {}
