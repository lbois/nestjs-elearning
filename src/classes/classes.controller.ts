import { Controller, Get } from '@nestjs/common';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
    constructor(private classesService: ClassesService) {}

    @Get()
    getAllClasses() {
        return this.classesService.getAllClasses();
    }
}
