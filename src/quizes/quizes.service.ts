import { Injectable, Inject, UseGuards, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Quiz } from './quiz.interface';
import { GetQuizesFilterDto } from './dto/get-quizes-filter.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { User } from 'src/auth/user.interface';

@Injectable()
export class QuizesService {
    constructor(
        @Inject('CLASS_MODEL')
        private classModel: Model<Quiz>,
        @Inject('USER_MODEL')
        private userModel: Model<User>
      ) {}

async getAllQuizes(user: User) : Promise<Quiz[]> {
  // console.log(user);
    const userEntity = await this.userModel.find({username: user.username}).exec();
console.log(userEntity[0]);
    return this.classModel.find({user: userEntity[0]._id}).exec();
    
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


async getQuizById(id: string, user:User): Promise<Quiz[]> {
      
    const userEntity = await this.userModel.find({username: user.username}).exec();
    const found = await this.classModel.find({_id: id, user: userEntity[0]._id}).exec();

    // console.log(found);

    if (!found[0]) {
      // console.log('Not found');
      throw new NotFoundException('Quiz not found');
    }

    return found;
}

async deleteQuiz(id: string, user: User): Promise<any> {
    let quizes: Quiz[] = await this.getQuizById(id, user);
    console.log('*'+quizes[0]._id+'*');
    
    const userEntity = await this.userModel.find({username: user.username}).exec();
    console.log('*' + userEntity[0]._id+'*');
    await this.classModel.findOneAndDelete({_id: new mongoose.mongo.ObjectID(quizes[0]._id), user: userEntity[0]._id});

    return { message: 'Object ' + quizes[0]._id + ' removed'};

    
}

async updateQuiz(id: string, updateQuizDto: UpdateQuizDto, user: User): Promise<any> {
  const {title, description , author} = updateQuizDto;
  
  const userEntity = await this.userModel.find({username: user.username}).exec();
    

  const updatedObject:any = await this.classModel.findByIdAndUpdate(id, 
    {title, description, author, user: userEntity[0]._id});
  return {id, title, description, author};
}

}
