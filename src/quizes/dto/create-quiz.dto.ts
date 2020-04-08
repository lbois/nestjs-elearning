import { IsNotEmpty } from "class-validator";

export class CreateQuizDto {

    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    author: string;
}