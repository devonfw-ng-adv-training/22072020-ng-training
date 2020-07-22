import {Component} from '@angular/core';
import {Book} from '../book.model';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  book: Book;

  constructor() {
    this.book = {
      author: 'Douglas Crockford',
      title: 'JavaScript. The good parts',
    };
  }
}
