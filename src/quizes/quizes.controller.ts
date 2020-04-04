import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { Quiz } from './quiz.interface';
import { GetQuizesFilterDto } from './dto/get-quizes-filter.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.interface';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('quizes')
@UseGuards(AuthGuard('jwt'))
export class QuizesController {
    constructor(private quizesService: QuizesService) {}

    @Get()
    async getQuizes(@Query() filterDto: GetQuizesFilterDto, @GetUser() user: User): Promise<Quiz[]> {
        
        if (Object.keys(filterDto).length) {
            return await this.quizesService.getQuizesWithFilters(filterDto, user);
        } else {
            return await this.quizesService.getAllQuizes(user);

        }
       
    }

    @Post()
    async createQuiz(@Body() createQuizDto:CreateQuizDto,
    @GetUser() user: User): Promise<Quiz> {
        return await this.quizesService.createQuiz(createQuizDto, user);
    }

    
    @Get(':id')
    async getQuizById(@Param('id') id: string, @GetUser() user: User): Promise<Quiz[]> {
        return await this.quizesService.getQuizById(id, user);
    }

    
    @Delete(':id')
    deleteQuiz(@Param('id') id: string, @GetUser() user:User): void {
        this.quizesService.deleteQuiz(id, user);
        

    }

    
    @Patch('/:id')
    async updateQuiz(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto,
    @GetUser() user: User): Promise<any> {
        return await this.quizesService.updateQuiz(id, updateQuizDto, user);
    
    }

}
