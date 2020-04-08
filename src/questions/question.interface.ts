
import * as mongoose from 'mongoose';

export interface Question extends mongoose.Document{
    question_text:string,
    answers: string[],
    correct_answer_index:number,
    quiz:string
}