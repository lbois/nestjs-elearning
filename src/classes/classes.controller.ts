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
    async getClasses(@Query() filterDto: GetClassesFilterDto): Promise<Class[]> {
        console.log(Object.keys(filterDto).length);
        if (Object.keys(filterDto).length) {
            return await this.classesService.getClassesWithFilters(filterDto);
        } else {
            return await this.classesService.getAllClasses();

        }
       
    }

    @Post()
    async createClass(@Body() createClassDto:CreateClassDto): Promise<Class> {
        return await this.classesService.createClass(createClassDto);
    }

    
    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Class[]> {
        return await this.classesService.getClassById(id);
    }

    
    @Delete(':id')
    deleteClass(@Param('id') id: string): void {
        this.classesService.deleteClass(id);

    }

    
    @Patch('/:id')
    async updateClass(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto): Promise<any> {
        return await this.classesService.updateClass(id, updateClassDto);
    }

}
