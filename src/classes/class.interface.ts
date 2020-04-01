
import * as mongoose from 'mongoose';

export interface Class extends mongoose.Document{
    title: string;
    description: string;
}