import { QuizSchema} from './schemas/quiz.schema';
import { UserSchema } from '../auth/schemas/user.schema';
import { quizesProviders } from './quizes.providers';
import { QuizesService } from './quizes.service';
import { usersProviders } from '../auth/users.providers';
import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import mockingoose from 'mockingoose';
import { User } from 'src/auth/user.interface';
import { Quiz } from './quiz.interface';

const USER_MODEL =  mongoose.model('User', UserSchema);

const CLASS_MODEL =  mongoose.model('Quiz', QuizSchema);

const mockingQuizModel = () => {

}

const mockingUserModel = () => {

}

describe('QuizesService', () => {
    let quizesService;
    let userModel, classModel;
    

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [QuizesService,
            {provide: USER_MODEL, useFactory: mockingUserModel},
            {provide: CLASS_MODEL, useFactory: mockingQuizModel},
        ],
        }).compile();

        quizesService = await module.get<QuizesService>(QuizesService);
        classModel = await module.get<mongoose.Model<Quiz>>(CLASS_MODEL)
        userModel = await module.get<mongoose.Model<User>>(USER_MODEL)
    })

    describe('getAllQuizes', ()=> {

        it('get all quizes', () => {
           // expect(quizesRepository.getAllQuizes).not.toHaveBeenCalled();
        })

    })
})
