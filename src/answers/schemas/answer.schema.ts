import * as mongoose from 'mongoose';

export const AnswerSchema = new mongoose.Schema({
answer_pct: Number,
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})