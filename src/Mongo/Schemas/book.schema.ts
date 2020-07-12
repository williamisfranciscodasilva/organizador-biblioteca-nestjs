import { AuthorSchema } from './author.schema';
import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    name: String,
    author: [AuthorSchema],
    language: String,
    releaseYear: Number,
    publisher: String,
    pages: Number,
})