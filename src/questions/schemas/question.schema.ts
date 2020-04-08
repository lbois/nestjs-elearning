import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
  question_text: String,
  answers: [String],
  correct_answer_index: Number,
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }
});