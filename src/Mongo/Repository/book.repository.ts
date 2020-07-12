import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "../Interfaces/book.interface";
import { Model } from 'mongoose';
import { BookDTO } from "src/DTO/books.dto";

@Injectable()
export class BookRepository {

    constructor(
        @InjectModel('book') private readonly bookModel: Model<Book>
    ) {}

    async getAllBooks(): Promise<Book[]>{
        return await this.bookModel.find({}, { __v: false}).sort({ name: +1}).exec();
    }

    async getBookById(bookID: string): Promise<Book>{
        return await this.bookModel.findById(bookID, { __v: false});
    }

    async getBookByAuthorName(authorName: string[]): Promise<Book[]> {
        
        return await this.bookModel.find({

            $or : [
                { "author.name" : { $in: authorName } },
                { "author.surname" : { $in : authorName } }
            ]

        });
    }

    async getBookByName(bookName: string): Promise<Book[]>{

        return await this.bookModel.find({
            name : { '$regex' : bookName, '$options' : 'i'}
        }, { __v: false}
        );

    }

    async saveBook(newBook: BookDTO): Promise<Book>{
        const savedBook = this.bookModel(newBook);
        return await savedBook.save();
    }

    async deleteBookById(bookId: string): Promise<Book>{
        return await this.bookModel.findOneAndDelete({ _id: bookId});
    }

    async updateBookById(bookID: string, newBook: BookDTO): Promise<Book>{
        return await this.bookModel.replaceOne({ _id: bookID }, newBook);
    }

}