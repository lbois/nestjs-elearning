import { IsNotEmpty, IsArray } from "class-validator";

export class CreateAnswerDto {
    

    @IsNotEmpty()
    answer_pct: number;

    @IsNotEmpty()
    quizId: string;




    // @IsNotEmpty()
    // userId: string;
}