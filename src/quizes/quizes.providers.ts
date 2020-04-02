import { Connection } from 'mongoose';
import { QuizSchema } from './schemas/quiz.schema';

export const quizesProviders = [
  {
    provide: 'CLASS_MODEL',
    useFactory: (connection: Connection) => connection.model('Quiz', QuizSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];