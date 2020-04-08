import { IsNotEmpty, IsArray } from "class-validator";

export class CreateQuestionsDto {
    @IsNotEmpty()
    question_text:string;

    @IsArray()
    @IsNotEmpty()
    answers: string[];

    @IsNotEmpty()
    correct_answer_index: number;

    @IsNotEmpty()
    quizId: string;
}