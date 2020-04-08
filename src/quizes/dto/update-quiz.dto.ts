import { IsNotEmpty } from "class-validator";

export class UpdateQuizDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    author: string;
}