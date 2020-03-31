import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './class.interface';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { GetClassesFilterDto } from './dto/get-classes-filter.dto';

@Controller('classes')
export class ClassesController {
    constructor(private classesService: ClassesService) {}

    @Get()
    getClasses(@Query() filterDto: GetClassesFilterDto): Class[] {
        console.log(Object.keys(filterDto).length);
        if (Object.keys(filterDto).length) {
            return this.classesService.getClassesWithFilters(filterDto);
        } else {
            return this.classesService.getAllClasses();

        }
       
    }

    @Post()
    createClass(@Body() createClassDto:CreateClassDto) {
        return  this.classesService.createClass(createClassDto);
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): Class {
        return this.classesService.getClassById(id);
    }

    @Delete(':id')
    deleteClass(@Param('id') id: string): void {
        this.classesService.deleteClass(id);

    }

    @Patch('/:id')
    updateClass(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto): Class {
        return this.classesService.updateClass(id, updateClassDto);
    }

}
