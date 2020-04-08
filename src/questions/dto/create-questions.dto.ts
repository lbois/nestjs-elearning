export class CreateQuestionsDto {
    question_text:string;
    answers: string[];
    correct_answer_index: number;
    quizId: string;
}