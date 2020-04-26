import { Controller, Post, Body, UseGuards, Get, Query, Delete, Param, Patch, ValidationPipe, UsePipes } from '@nestjs/common';
import { CreateQuestionsDto } from './dto/create-questions.dto';
import { Question } from './question.interface';
import { AuthGuard } from '@nestjs/passport';
import { QuestionsService } from './questions.service';
import { GetQuestionsFilterDto } from './dto/get-questions-filter.dto';
import { UpdateQuestionsDto } from './dto/update-questions-dto';

@Controller('questions')
@UseGuards(AuthGuard('jwt'))
export class QuestionsController {
    constructor(private questionsService: QuestionsService) {};


    @Get()
    async getQuestions(@Query() filterDto: GetQuestionsFilterDto): Promise<Question[]> {
        return await this.questionsService.getQuestions(filterDto);
    }


    @Get(':id')
    async getQuestionById(@Param('id') id: string): Promise<Question[]> {
        return await this.questionsService.getQuestionById(id);
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    async createQuestions(@Body() createQuestionsDto:CreateQuestionsDto,
    ): Promise<Question> {
        console.log(createQuestionsDto);
        return await this.questionsService.createQuestions(createQuestionsDto);
    }

        
    @Patch('/:id')
    async updateQuestions(@Param('id') id: string, @Body() updateQuestionsDto: UpdateQuestionsDto): Promise<any> {
        return await this.questionsService.updateQuestions(id, updateQuestionsDto);
    
    }


    @Delete(':id')
    deleteQuestions(@Param('id') id: string): void {
        this.questionsService.deleteQuestions(id);
        

    }

}
