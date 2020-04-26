import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './answer.interface';
import { Model } from 'mongoose';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { User } from 'src/auth/user.interface';

@Injectable()
export class AnswersService {
    constructor(
        @InjectModel('Answer')
        private answerModel: Model<Answer>,
        @InjectModel('User')
        private userModel: Model<User>
      ) {}
      async createAnswer(createAnswerDto: CreateAnswerDto, user: User):Promise<Answer> {
        const {answer_pct, quizId} = createAnswerDto;
        let userId;

        if (user)  {
        try {
          const userEntity = await this.userModel.find({username: user.username}).exec();
          userId = userEntity[0]._id;
    // console.log('-getAllQuizes: After find user _id: ' + user);
        } catch (error) {
          throw new NotFoundException('user not found');
    
        }
        
        const createdAnswer = new  this.answerModel({answer_pct, quiz: quizId,  user: userId });

        return createdAnswer.save();
    
        }

      }

}

