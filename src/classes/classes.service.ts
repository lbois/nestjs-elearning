import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './class.interface';
import * as uuid from 'uuid/v1';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { GetClassesFilterDto } from './dto/get-classes-filter.dto';

@Injectable()
export class ClassesService {
    constructor(
        @Inject('CLASS_MODEL')
        private classModel: Model<Class>,
      ) {}
private classes: Class[] = [];

getAllClasses() : Promise<Class[]> {
    return this.classModel.find().exec();
}


async getClassesWithFilters(filterDto: GetClassesFilterDto): Promise<Class[]> {
 
 const {search} = filterDto;

 console.log(search);

 let classes = this.getAllClasses();

  return await this.classModel.find({ $or: [ {title: {$regex: '.*' + search + '.*', $options: 'i'}},
  {description: {$regex: '.*' + search + '.*'  , $options: 'i'}}]
}).exec();

 

}

async createClass(createClassDto: CreateClassDto): Promise<Class> {

    const createdClass = new this.classModel(createClassDto);

    return createdClass.save();
}


async getClassById(id: string): Promise<Class[]> {
    console.log(id);
    return this.classModel.find({_id: id}).exec();
}

async deleteClass(id: string): Promise<any> {
    let classes: Class[] = await this.getClassById(id);
    console.log(classes[0]);
    
    await this.classModel.findByIdAndDelete(classes[0]._id);

    return { message: 'Object ' + classes[0]._id + ' removed'};

    
}

async updateClass(id: string, updateClassDto: UpdateClassDto): Promise<any> {
  const {title, description } = updateClassDto;
  

  const updatedObject:any = await this.classModel.findByIdAndUpdate(id, 
    {title, description});
  return {id, title, description};
}

}
