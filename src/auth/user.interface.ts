
import * as mongoose from 'mongoose';

export interface User extends mongoose.Document{
    username: string;
    password: string;
    salt: string;
    profile: string;
}