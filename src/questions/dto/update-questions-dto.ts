import { IsNotEmpty, IsArray } from "class-validator";

export class UpdateQuestionsDto {
    
    question_text:string;

    
    answers: string[];

    
    correct_answer_index: number;

    
    quizId: string;
}