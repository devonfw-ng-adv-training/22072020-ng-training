import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../book.model';
import {BookService} from '../book.service';
import {ActivatedRoute} from '@angular/router';
import {map, pluck, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  private bookId: number | undefined;
  book$: Observable<Book>;

  constructor(books: BookService, route: ActivatedRoute) {
    this.book$ = route.data
      .pipe( // {book: {id: 6, author: 'fdsfs'}, someOtherParam: 'some value'}
        pluck('book') // {id: 6, author: 'fdsfs'}
      );
    // this.book$ = route.params.pipe(  // {bookId: '6', someOtherParam: 'some value'}
    //   pluck('bookId'), // '6'
    //   map(bookIdAsString => +bookIdAsString), // 6
    //   tap(bookId => this.bookId = bookId),
    //   switchMap(bookId => books.getOne(bookId))
    // );
  }

  notifyOnBookChange(event: Event): void {
    event.preventDefault();
    const bookForm = event.target as HTMLFormElement;
    const authorElement = bookForm.querySelector<HTMLInputElement>('#author');
    const titleElement = bookForm.querySelector<HTMLInputElement>('#title');
    const changedBook: Book = {
      id: this.bookId != null ? this.bookId : NaN,
      author: (authorElement && authorElement.value) || '',
      title: (titleElement && titleElement.value) || ''
    };
  }
}
