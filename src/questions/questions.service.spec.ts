import { QuestionSchema } from './schemas/question.schema';
import { QuestionsService } from './questions.service';
import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { Question } from './question.interface';
import { getModelToken } from '@nestjs/mongoose';

function mockingQuestionModel()  {
    
    this.save = jest.fn()
  }
  

  describe('QuestionsService', () => {
    let questionsService;
    let clientQuestionModel ;

    beforeEach(async () => {
        
        const module = await Test.createTestingModule({
            
            providers: [QuestionsService, 
            {provide: getModelToken('Question'), useValue: new mockingQuestionModel()},
        ],
        }).compile();

        questionsService = module.get<QuestionsService>(QuestionsService);
        clientQuestionModel = module.get(getModelToken('Question'))
        
        
    })

    describe('createQuestions', ()=> {

        it('Create a new question successfully', async () => {
            expect(clientQuestionModel.save).not.toHaveBeenCalled();
            /*const result = await questionsService.createQuestions({question_text: "Question text",
        answers: ["Answer1", "Answer2"], correct_answer_index:0, quiz: '1234'})
            expect(clientQuestionModel.save).toHaveBeenCalled();
            */
        })
    })
  });