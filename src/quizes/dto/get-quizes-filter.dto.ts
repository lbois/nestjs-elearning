import { IsOptional, IsNotEmpty } from "class-validator";

export class GetQuizesFilterDto {

    @IsOptional()
    @IsNotEmpty()
    search: string;
}