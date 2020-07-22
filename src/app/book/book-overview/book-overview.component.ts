import {Component} from '@angular/core';
import {Book} from '../book.model';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[];

  selectedBook: Book | undefined;

  constructor() {
    this.books = [
      {
        id: 0,
        author: 'Douglas Crockford',
        title: 'JavaScript. The good parts',
      },
      {
        id: 1,
        author: 'Kyle Simpson',
        title: 'You don\'t know JS',
      },
      {
        id: 2,
        author: 'Marek Matczak',
        title: 'Angular for nerds',
      }
    ];
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBook(bookToUpdate: Book): void {
    this.books = this.books.map(
      book => book.id === bookToUpdate.id ? bookToUpdate : book);
    this.selectedBook = undefined;
  }
}
