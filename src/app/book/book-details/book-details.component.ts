import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../book.model';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  @Input()
  book: Book | undefined;

  @Output()
  bookChange = new EventEmitter<Book>();

  constructor() {
  }

  notifyOnBookChange(event: Event): void {
    event.preventDefault();
    const bookForm = event.target as HTMLFormElement;
    const authorElement = bookForm.querySelector<HTMLInputElement>('#author');
    const titleElement = bookForm.querySelector<HTMLInputElement>('#title');
    const changedBook: Book = {
      id: this.book ? this.book.id : NaN,
      author: (authorElement && authorElement.value) || '',
      title: (titleElement && titleElement.value) || ''
    };
    this.bookChange.emit(changedBook);
  }
}
