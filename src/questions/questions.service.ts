import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionsDto } from './dto/create-questions.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.interface';
import { GetQuestionsFilterDto } from './dto/get-questions-filter.dto';
import * as mongoose from 'mongoose';
import { UpdateQuestionsDto } from './dto/update-questions-dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectModel('Question')
        private questionModel: Model<Question>,
      ) {}

      async getQuestions(getQuestionsFilterDto: GetQuestionsFilterDto):Promise<Question[]> {
        const {quizId} = getQuestionsFilterDto;

        return await this.questionModel.find({quiz: quizId}).populate('quiz', 'title description -_id').exec();
      }

      async getQuestionById(id: string): Promise<Question[]> {
      
        const found = await this.questionModel.find({_id: id}).exec();
    
        // console.log(found);
    
        if (!found[0]) {
          // console.log('Not found');
          throw new NotFoundException('Question not found');
        }
    
        return found;
    }

    createQuestions(createQuestionsDto: CreateQuestionsDto):Promise<Question> {
        const {question_text, answers, correct_answer_index, quizId} = createQuestionsDto;
        const createdQuestions = new  this.questionModel({question_text, answers, correct_answer_index, quiz: quizId });

        return createdQuestions.save();
    
    }


    async updateQuestions(id: string, updateQuestionsDto: UpdateQuestionsDto): Promise<any> {
       const {question_text, answers , correct_answer_index, quizId} = updateQuestionsDto;
    
    var data = {quiz: quizId};
    
    if (question_text) {
        var params  = {quiz: quizId, question_text}
        data = {...params};
        console.log(data)
    }
    if (answers) {
        var params1  = {quiz: quizId, answers}
        data = {...data, ...params1};
        console.log(data)
    }

    if (correct_answer_index) {
        var params2  = {quiz: quizId, correct_answer_index}
        data = {...data, ...params2};
    }

    console.log(data);
    const updatedObject:any = await this.questionModel.findByIdAndUpdate(id, 
      { $set: data });
    return {id, question_text, answers, correct_answer_index, quizId};
  }

    async deleteQuestions(id: string): Promise<any> {
        await this.questionModel.findOneAndDelete({ _id: new mongoose.mongo.ObjectID(id)});

        return { message: 'Question ' + id + ' removed'};

    
    }
}
