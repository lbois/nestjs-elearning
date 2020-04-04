
import * as mongoose from 'mongoose';

export interface Quiz extends mongoose.Document{
    title: string;
    description: string;
    author: string;
    user: string;
}