import * as mongoose from 'mongoose';

export interface Answer extends mongoose.Document{
    answer_pct:number,
    quiz:string
    user:string,
}