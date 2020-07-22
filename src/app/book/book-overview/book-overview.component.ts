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
        author: 'Douglas Crockford',
        title: 'JavaScript. The good parts',
      },
      {
        author: 'Kyle Simpson',
        title: 'You don\'t know JS',
      },
      {
        author: 'Marek Matczak',
        title: 'Angular for nerds',
      }
    ];
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }
}
