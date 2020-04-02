import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { Quiz } from './quiz.interface';
import { GetQuizesFilterDto } from './dto/get-quizes-filter.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('quizes')
@UseGuards(AuthGuard('jwt'))
export class QuizesController {
    constructor(private quizesService: QuizesService) {}

    @Get()
    async getQuizes(@Query() filterDto: GetQuizesFilterDto): Promise<Quiz[]> {
        console.log(Object.keys(filterDto).length);
        if (Object.keys(filterDto).length) {
            return await this.quizesService.getQuizesWithFilters(filterDto);
        } else {
            return await this.quizesService.getAllQuizes();

        }
       
    }

    @Post()
    async createQuiz(@Body() createQuizDto:CreateQuizDto): Promise<Quiz> {
        return await this.quizesService.createQuiz(createQuizDto);
    }

    
    @Get(':id')
    async getQuizById(@Param('id') id: string): Promise<Quiz[]> {
        return await this.quizesService.getQuizById(id);
    }

    
    @Delete(':id')
    deleteQuiz(@Param('id') id: string): void {
        this.quizesService.deleteQuiz(id);

    }

    
    @Patch('/:id')
    async updateQuiz(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto): Promise<any> {
        return await this.quizesService.updateQuiz(id, updateQuizDto);
    }

}
