import { BookDTO } from './../../DTO/books.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { BookRepository } from 'src/Mongo/Repository/book.repository';
import { Book } from 'src/Mongo/Interfaces/book.interface';

@Injectable()
export class BooksService {

    constructor(
        private readonly bookRepository: BookRepository
    ){}
    
    async getAllBooks(): Promise<Book[]> {
        const allBook = await this.bookRepository.getAllBooks();

        if(!allBook.length) 
            throw new BadRequestException('There are no books registered yet');
        
        return allBook
    }

    async getBookById(bookID: string): Promise<Book> {
        try {
            const existBook = await this.bookRepository.getBookById(bookID);

            if(!existBook)
                throw new BadRequestException('There are no results');
            
            return existBook;
        } catch (e) {
            throw new BadRequestException('There are no results')
        }
    }

    async getBookByAuthorName(authorName: string): Promise<Book[]> {
        const splitedAuthorName = authorName.split(' ');

        const foundBooks = await this.bookRepository.getBookByAuthorName(splitedAuthorName);

        if(!foundBooks.length)
            throw new BadRequestException('No results for this author');
        
        return foundBooks;
    }

    async getBookByName(bookName: string): Promise<Book[]> {

        const foundBooks = await this.bookRepository.getBookByName(bookName);

        if(!foundBooks.length)
            throw new BadRequestException('No results for this name');
        
        return foundBooks;
    }

    async saveBook(newBook: BookDTO): Promise<Book> {
        return await this.bookRepository.saveBook(newBook);
    }

    async deleteBookById(bookID: string): Promise<Book>{
        try {
            return await this.bookRepository.deleteBookById(bookID);
        } catch (e) {
            throw new BadRequestException('This book does not exists')
        }
    }

    async updateBookById(bookID: string, newBook: BookDTO): Promise<Book>{
        const existBook = await this.bookRepository.getBookById(bookID);

        if(!existBook)
            throw new BadRequestException('There are no results with this ID'); 

        const updatedBook = this.bookRepository.updateBookById(bookID, newBook);

        if(updatedBook)
            return this.bookRepository.getBookById(bookID);
        else
            throw new BadRequestException('Error in update');
    }
}
