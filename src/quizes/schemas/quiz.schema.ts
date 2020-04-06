import * as mongoose from 'mongoose';

export const QuizSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
