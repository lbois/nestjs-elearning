
import * as mongoose from 'mongoose';

export interface Quiz extends mongoose.Document{
    _id: string;
    title: string;
    description: string;
    author: string;
    user: string;
}