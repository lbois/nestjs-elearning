import { Injectable, Inject, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Quiz } from './quiz.interface';
import { GetQuizesFilterDto } from './dto/get-quizes-filter.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { User } from 'src/auth/user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class QuizesService {
    constructor(
        @InjectModel('Quiz')
        private classModel: Model<Quiz>,
        @InjectModel('User')
        private userModel: Model<User>
      ) {}

async getAllQuizes(user: User) : Promise<Quiz[]> {
    // console.log('-getAllQuizes: user ' + JSON.stringify(user));
    let userId;
    try {
    const userEntity = await this.userModel.find({username: user.username}).exec();
    userId = userEntity[0]._id;
    // console.log('-getAllQuizes: After find user _id: ' + user);
    } catch (error) {
      throw new NotFoundException('user not found');
    
    }
    return await this.classModel.find({user: userId}).exec();
    
}


async getQuizesWithFilters(filterDto: GetQuizesFilterDto, user: User): Promise<Quiz[]> {
 
 const {search} = filterDto;

  const userEntity = await this.userModel.find({username: user.username }).exec();

  return await this.classModel.find({ user: userEntity[0]._id, $or: [ {title: {$regex: '.*' + search + '.*', $options: 'i'}},
  {description: {$regex: '.*' + search + '.*'  , $options: 'i'}}]
}).exec();

 

}

async createQuiz(createQuizDto: CreateQuizDto, user: User): Promise<Quiz> {

    const {title, description } = createQuizDto;

    const userEntity = await this.userModel.find({username: user.username}).exec();
    
    const createdQuiz = new this.classModel({title, description, user: userEntity[0]._id });

    return createdQuiz.save();
    
}


async getQuizById(id: string, user:User): Promise<Quiz> {
    if (!mongoose.isValidObjectId(id))
    { throw new BadRequestException('Id is not valid'); }

    const userEntity = await this.userModel.find({username: user.username}).exec();
    const found = await this.classModel.find({_id: new mongoose.mongo.ObjectID(id), user: userEntity[0]._id}).exec();

    // console.log(found);

    if (!found[0]) {
      // console.log('Not found');
      throw new NotFoundException('Quiz not found');
    }

    return found[0];
}

async deleteQuiz(id: string, user: User): Promise<any> {
  
  
  let quiz: Quiz = await this.getQuizById(id, user);

    
    const userEntity = await this.userModel.find({username: user.username}).exec();
    await this.classModel.findOneAndDelete({_id: new mongoose.mongo.ObjectID(quiz._id), user: userEntity[0]._id});

    return { message: 'Object ' + quiz._id + ' removed'};

    
}

async updateQuiz(id: string, updateQuizDto: UpdateQuizDto, user: User): Promise<any> {
  const {title, description , author} = updateQuizDto;
  let quiz: Quiz = await this.getQuizById(id, user);
  const userEntity = await this.userModel.find({username: user.username}).exec();
    

  const updatedObject:any = await this.classModel.findByIdAndUpdate(id, 
    {title, description, author, user: userEntity[0]._id});
  return {id, title, description, author};
}

}
