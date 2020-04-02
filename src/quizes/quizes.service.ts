import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Quiz } from './quiz.interface';
import { GetQuizesFilterDto } from './dto/get-quizes-filter.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizesService {
    constructor(
        @Inject('CLASS_MODEL')
        private classModel: Model<Quiz>,
      ) {}

getAllQuizes() : Promise<Quiz[]> {
    return this.classModel.find().exec();
}


async getQuizesWithFilters(filterDto: GetQuizesFilterDto): Promise<Quiz[]> {
 
 const {search} = filterDto;

 console.log(search);

 let classes = this.getAllQuizes();

  return await this.classModel.find({ $or: [ {title: {$regex: '.*' + search + '.*', $options: 'i'}},
  {description: {$regex: '.*' + search + '.*'  , $options: 'i'}}]
}).exec();

 

}

async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {

    const createdQuiz = new this.classModel(createQuizDto);

    return createdQuiz.save();
}


async getQuizById(id: string): Promise<Quiz[]> {
    console.log(id);
    return this.classModel.find({_id: id}).exec();
}

async deleteQuiz(id: string): Promise<any> {
    let quizes: Quiz[] = await this.getQuizById(id);
    console.log(quizes[0]);
    
    await this.classModel.findByIdAndDelete(quizes[0]._id);

    return { message: 'Object ' + quizes[0]._id + ' removed'};

    
}

async updateQuiz(id: string, updateQuizDto: UpdateQuizDto): Promise<any> {
  const {title, description , author} = updateQuizDto;
  

  const updatedObject:any = await this.classModel.findByIdAndUpdate(id, 
    {title, description, author});
  return {id, title, description, author};
}

}
