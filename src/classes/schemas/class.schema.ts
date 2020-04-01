import * as mongoose from 'mongoose';

export const ClassSchema = new mongoose.Schema({
  title: String,
  description: String,
});