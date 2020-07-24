import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../book.model';
import {BookService} from '../book.service';
import {ActivatedRoute, Data} from '@angular/router';
import {map, pluck, switchMap, tap} from 'rxjs/operators';
import {Observable, OperatorFunction} from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  private bookId: number | undefined;
  book$: Observable<Book>;

  constructor(private readonly books: BookService,
              private readonly location: Location,
              route: ActivatedRoute) {
    this.book$ = route.data
      .pipe( // {book: {id: 6, author: 'fdsfs'}, someOtherParam: 'some value'}
        getResolvedBook(), // {id: 6, author: 'fdsfs'}
        map(book => book || {author: '', title: ''}),
        tap(book => this.bookId = book.id)
      );
  }

  saveBook(event: Event): void {
    event.preventDefault();
    const bookForm = event.target as HTMLFormElement;
    const authorElement = bookForm.querySelector<HTMLInputElement>('#author');
    const titleElement = bookForm.querySelector<HTMLInputElement>('#title');
    const bookToSave: Book = {
      id: this.bookId,
      author: (authorElement && authorElement.value) || '',
      title: (titleElement && titleElement.value) || ''
    };

    this.books.saveOrUpdateBook(bookToSave)
      .subscribe(() => {
        this.location.back();
      });
  }
}

function getResolvedBook(): OperatorFunction<Data, Book | undefined> {
  return pluck('book');
}
