import { BooksService } from './../../Services/books/books.service';
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { BookDTO} from '../../DTO/books.dto'
import { Book } from 'src/Mongo/Interfaces/book.interface';

@Controller('books')
export class BooksController {

    constructor(
        private readonly bookService: BooksService
    ){}

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return await this.bookService.getAllBooks();
    }

    @Get('id/:bookID')
    async getBookById(@Param('bookID') bookID: string): Promise<Book>{
        return await this.bookService.getBookById(bookID);
    }

    @Get('author/:authorName')
    async getBookByAuthorName(@Param('authorName') authorName: string): Promise<Book[]>{
        return await this.bookService.getBookByAuthorName(authorName);
    }

    @Get('name/:bookName')
    async getBookByName(@Param('bookName') bookName: string): Promise<Book[]>{
        return await this.bookService.getBookByName(bookName);
    }

    @Post()
    async saveBook(@Body() newBook: BookDTO): Promise<Book> {
        return await this.bookService.saveBook(newBook);
    }

    @Patch(':bookID')
    async updateBookById(@Param('bookID') bookID: string, @Body() newBook: BookDTO): Promise<Book> {
        return await this.bookService.updateBookById(bookID, newBook);
    }

    @Delete(':bookID')
    async deleteBookById(@Param('bookID') bookID: string, ): Promise<Book> {
        return await this.bookService.deleteBookById(bookID);
    }
}
