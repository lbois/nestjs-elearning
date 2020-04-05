import { QuizSchema} from './schemas/quiz.schema';
import { UserSchema } from '../auth/schemas/user.schema';
import { quizesProviders } from './quizes.providers';
import { QuizesService } from './quizes.service';
import { usersProviders } from '../auth/users.providers';
import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/user.interface';
import { Quiz } from './quiz.interface';
import { databaseProviders } from '../database.providers';
import { getModelToken } from '@nestjs/mongoose';

const userModel:mongoose.Model<User> =  mongoose.model('User', UserSchema);

const CLASS_MODEL:mongoose.Model<Quiz> =  mongoose.model('Quiz', QuizSchema);

function mockingQuizModel()  {
  this.find = jest.fn()
}




   function mockingUserModel() {
    this.find = jest.fn()
   }
   

const mockUser = {
  username: 'Test user'
}

describe('QuizesService', () => {
    let quizesService;
    let clientUserModel , clientClassModel;
    

    beforeEach(async () => {
        
        const module = await Test.createTestingModule({
            
            providers: [QuizesService, //...usersProviders, ...quizesProviders,...databaseProviders,
            {provide: getModelToken('USER_MODEL'), useValue: new mockingUserModel()},
            {provide: getModelToken('CLASS_MODEL'), useValue: new mockingQuizModel()},
           // {provide: 'DATABASE_CONNECTION', useFactory: mockingDatabaseConnection},
        ],
        }).compile();

        quizesService = module.get<QuizesService>(QuizesService);
        clientClassModel = module.get(getModelToken('CLASS_MODEL'))
        clientUserModel =  module.get(getModelToken('USER_MODEL'))
        //dbConnection = await module.get<mongoose.Connection>('DATABASE_CONNECTION')
        //console.log(classModel);
        // console.log(clientClassModel);
        
    })

    describe('getAllQuizes', ()=> {

        it('get all quizes, user not found', async () => {
            clientUserModel.find.mockRejectedValue('user not found');
            clientClassModel.find.mockResolvedValue([{title: 'test', description: 'test'}])
            
           //jest.spyOn(clientUserModel, 'find');
           // jest.spyOn(clientClassModel, 'find');
           expect(clientUserModel.find).not.toHaveBeenCalled();
           expect(clientClassModel.find).not.toHaveBeenCalled();
           const result = quizesService.getAllQuizes(mockUser).catch((err)=>{
            expect(err.message).toEqual('user not found');
           });
           expect(clientUserModel.find).toHaveBeenCalled();

           // expect(clientClassModel.find).toHaveBeenCalled();
           
           
        })

        it('get all quizes, find quizzes', async () => {
            clientUserModel.find.mockReturnValue({_id:'1234', username:'Test user'});
            clientClassModel.find.mockResolvedValue([{title: 'test', description: 'test'}])
            
           //jest.spyOn(clientUserModel, 'find');
           // jest.spyOn(clientClassModel, 'find');
           expect(clientUserModel.find).not.toHaveBeenCalled();
           expect(clientClassModel.find).not.toHaveBeenCalled();
           const result =  quizesService.getAllQuizes(mockUser).then(state=> {
            expect(clientUserModel.find).toHaveBeenCalled();
            expect(clientClassModel.find).toHaveBeenCalled();
            expect(state).toEqual([{title: 'test', description: 'test'}])
           });
           

           // 
           
           
        })

    })
})
