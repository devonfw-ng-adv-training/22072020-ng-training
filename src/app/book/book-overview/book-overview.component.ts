import {Component} from '@angular/core';
import {Book} from '../book.model';
import {BookService} from '../book.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  readonly books$: Observable<Book[]>;

  selectedBook: Book | undefined;

  constructor(private readonly books: BookService) {
    this.books$ = books.value$;
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
