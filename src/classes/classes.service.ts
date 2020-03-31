import { Injectable } from '@nestjs/common';
import { Class } from './class.interface';
import * as uuid from 'uuid/v1';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { GetClassesFilterDto } from './dto/get-classes-filter.dto';

@Injectable()
export class ClassesService {
private classes: Class[] = [];

getAllClasses() : Class[] {
    console.log('get All classes');
    console.log(this.classes.length);
    return this.classes;
}

getClassesWithFilters(filterDto: GetClassesFilterDto): Class[] {
 console.log('get classes filter');
 console.log(filterDto);

 const {search} = filterDto;

 console.log(search);

 let classes = this.getAllClasses();

 if (search) {
     console.log('do filtering');
     classes = classes.filter(_class =>
        _class.title.includes(search) ||
        _class.description.includes(search),
      );
 }

 console.log(classes);

 return classes;

}

createClass(createClassDto: CreateClassDto): Class {

    const {title, description} = createClassDto;

    const _class: Class = {
        id: uuid(),
        title,
        description
    }

    this.classes.push(_class);

    return _class;
}

getClassById(id: string) {
    return this.classes.find(_class => _class.id === id);
}

deleteClass(id: string): void {
    this.classes = this.classes.filter(_class => _class.id !== id);
}

updateClass(id: string, updateClassDto: UpdateClassDto) {
  const {title, description } = updateClassDto;

  const _class = this.getClassById(id);
  _class.title = title;
  _class.description = description;

  return _class;
}

}
