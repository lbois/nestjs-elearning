import { Controller, Post, Body, Param, Get, Query, UseGuards } from '@nestjs/common';
import { Answer } from './answer.interface';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AnswersService } from './answers.service';
import { Quiz } from 'src/quizes/quiz.interface';
import { Question } from 'src/questions/question.interface';
import { QuizesService } from 'src/quizes/quizes.service';
import { QuestionsService } from 'src/questions/questions.service';
import { GetQuestionsFilterDto } from 'src/questions/dto/get-questions-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.interface';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('answers')
@UseGuards(AuthGuard('jwt'))
export class AnswersController {

    constructor(private answersService: AnswersService,
        private quizesService: QuizesService,
        private questionsService: QuestionsService) {};
    
    @Get('/quizes')
    async getAllQuizes(): Promise<Quiz[]> {
        console.log('/answers/quizes -> getAllQuizes')
        return this.quizesService.getAllQuizes();

    }

    @Get('/questions')
    async getQuestions(@Query() filterDto: GetQuestionsFilterDto):Promise<Question[]> {
        return this.questionsService.getQuestions(filterDto);
    }
    
    @Post()
    // @UsePipes(ValidationPipe)
    async createAnswer(@Body() createAnswerDto:CreateAnswerDto,@GetUser() user: User
    ): Promise<Answer> {
        console.log(createAnswerDto);
        return await this.answersService.createAnswer(createAnswerDto, user);
    }

}
