import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Book} from '../book.model';
import {BookService} from '../book.service';
import {fromEvent, Observable, OperatorFunction} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements AfterViewInit {
  @ViewChild('myInput')
  inputElement: ElementRef | undefined;

  readonly books$: Observable<Book[]>;

  selectedBook: Book | undefined;

  constructor(private readonly books: BookService) {
    this.books$ = books.value$
      .pipe(
        delay(1000)
      );
  }

  ngAfterViewInit(): void {
    if (this.inputElement) {
      fromEvent<Event>(this.inputElement.nativeElement, 'input')
        .pipe(
          mapFromEventToTargetValue(),
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(value => console.log(value));
    }
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBook(bookToUpdate: Book): void {
    this.books.updateBook(bookToUpdate)
      .subscribe(updatedBook => {
        this.selectedBook = updatedBook;
      });
  }
}

function mapFromEventToTargetValue(): OperatorFunction<Event, string> {
  return map<Event, string>(event => {
    const inputElement = event.target as HTMLInputElement;
    return inputElement.value;
  });
}
