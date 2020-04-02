import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  description: String,
  password: String,
  salt: String,
  profile: String,
});